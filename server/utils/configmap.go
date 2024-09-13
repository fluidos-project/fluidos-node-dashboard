package utils

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

func GetConfigMapByName(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	cmName := vars["name"]
	if cmName == "" {
		http.Error(w, "ConfigMap name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "",
		Version:  "v1",
		Resource: "configmaps",
	}

	cm, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), cmName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get ConfigMap or ConfigMap Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(cm)
}

type ConfigUpdate struct {
	IP   string `json:"ip"`
	Port string `json:"port"`
}

func AddFluidosNodeCM(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		http.Error(w, "Failed to create dynamic client", http.StatusInternalServerError)
		log.Fatalf("Failed to create dynamic client: %v", err)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "",
		Version:  "v1",
		Resource: "configmaps",
	}

	var configUpdate ConfigUpdate
	if err := json.NewDecoder(r.Body).Decode(&configUpdate); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	cm, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), "fluidos-network-manager-config", metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get ConfigMap", http.StatusInternalServerError)
		log.Println("Failed to get ConfigMap:", err)
		return
	}

	newEntry := configUpdate.IP + ":" + configUpdate.Port
	data := cm.Object["data"].(map[string]interface{})
	currentLocal := data["local"].(string)
	if currentLocal == "" {
		data["local"] = newEntry
	} else {
		data["local"] = currentLocal + "," + newEntry
	}
	cm.Object["data"] = data

	_, err = clientset.Resource(gvr).Namespace("fluidos").Update(r.Context(), cm, metav1.UpdateOptions{})
	if err != nil {
		http.Error(w, "Failed to update ConfigMap", http.StatusInternalServerError)
		log.Println("Failed to update ConfigMap:", err)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Fluidos Node added successfully"})
}
