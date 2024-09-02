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
