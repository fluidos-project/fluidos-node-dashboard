package utils

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"server/models"

	"github.com/gorilla/mux"
	"gopkg.in/yaml.v2"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

// retrieve all Flavor
func GetFlavors(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	//path to Flavor
	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "flavors",
	}

	// retrieve Flavors from API
	flavors, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Flavors", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	// Send the JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(flavors)
}

// retrieve the single Flavor by its name
func GetSingleFlavor(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	flavorName := vars["name"]
	if flavorName == "" {
		http.Error(w, "Flavor name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "flavors",
	}

	flavor, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), flavorName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Flavor or Flavor Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(flavor)
}

func AddFlavors(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	var flavorData map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&flavorData)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		log.Printf("Invalid request payload: %v", err)
		return
	}

	gvr_cm := schema.GroupVersionResource{
		Group:    "",
		Version:  "v1",
		Resource: "configmaps",
	}

	cm, err := clientset.Resource(gvr_cm).Namespace("fluidos").Get(r.Context(), "fluidos-network-manager-identity", metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Buyer Info ", http.StatusInternalServerError)
		return
	}
	ownerData, found, err := unstructured.NestedMap(cm.Object, "data")
	if !found || err != nil {
		http.Error(w, "Invalid Buyer info", http.StatusBadRequest)
		return
	}
	owner := models.OwnershipInfo{
		Domain: ownerData["domain"].(string),
		IP:     ownerData["ip"].(string),
		NodeID: ownerData["nodeID"].(string),
	}
	//log.Print(owner)

	flavor := models.CreateFlavorModel(flavorData, owner)

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "flavors",
	}

	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), flavor, metav1.CreateOptions{})
	if err != nil {
		http.Error(w, "Failed to create Flavor", http.StatusInternalServerError)
		return
	}
	//log.Println(flavor)

	// Risposta di successo
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Flavor created successfully"})
}

// Converts map[interface{}]interface{} to map[string]interface{}
func convertMapKeys(input map[interface{}]interface{}) map[string]interface{} {
	output := make(map[string]interface{})
	for key, value := range input {
		strKey, ok := key.(string)
		if !ok {
			log.Printf("Unsupported key type: %T", key)
			continue
		}
		switch v := value.(type) {
		case map[interface{}]interface{}:
			output[strKey] = convertMapKeys(v)
		default:
			output[strKey] = v
		}
	}
	return output
}

func AddFlavorsYAML(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	// il body della richiesta plain text YAML
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		log.Printf("Failed to read request body: %v", err)
		return
	}

	// YAML to map
	var yamlData map[interface{}]interface{}
	err = yaml.Unmarshal(body, &yamlData)
	if err != nil {
		http.Error(w, "Invalid YAML format", http.StatusBadRequest)
		log.Printf("Invalid YAML format: %v", err)
		return
	}

	flavorData := convertMapKeys(yamlData)

	flavorUnstructured := &unstructured.Unstructured{
		Object: flavorData,
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "flavors",
	}

	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), flavorUnstructured, metav1.CreateOptions{})
	if err != nil {
		http.Error(w, "Failed to create Flavor", http.StatusInternalServerError)
		log.Printf("Failed to create Flavor: %v", err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Flavor via YAML created successfully"})
}

func DeleteFlavor(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	// Recupera il nome del Flavor dai parametri della richiesta
	vars := mux.Vars(r)
	flavorName := vars["name"]
	if flavorName == "" {
		http.Error(w, "Flavor name is required", http.StatusBadRequest)
		return
	}

	// Definisce il GVR (GroupVersionResource) per il Flavor
	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "flavors",
	}

	// Elimina il Flavor specificato
	err = clientset.Resource(gvr).Namespace("fluidos").Delete(r.Context(), flavorName, metav1.DeleteOptions{})
	if err != nil {
		http.Error(w, "Failed to delete Flavor or Flavor Not Found", http.StatusInternalServerError)
		return
	}

	// Risposta di successo
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Flavor deleted successfully"})
}
