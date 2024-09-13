package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

// retrieve all Allocations
func GetAllocations(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "allocations",
	}

	allocations, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Allocations", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allocations)
}

func GetSingleAllocation(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	allocationName := vars["name"]
	if allocationName == "" {
		http.Error(w, "Allocation name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "allocations",
	}

	allocation, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), allocationName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Allocation or Allocation Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(allocation)
}

func AddAllocation(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	var allocationData map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&allocationData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	allocation := models.Allocation{
		Name:     allocationData["name"].(string),
		IntentID: allocationData["intentID"].(string),
		Contract: allocationData["contract"].(string),
	}

	allocationResource := models.NewAllocation(&allocation)

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "allocations",
	}
	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), allocationResource, metav1.CreateOptions{})
	if err != nil {
		http.Error(w, "Failed to create Allocation", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Allocation created successfully"})
}
