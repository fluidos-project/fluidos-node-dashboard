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

// retrieve all Peering Candidates
func GetPeeringCandidates(w http.ResponseWriter, r *http.Request) {

	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "advertisement.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "peeringcandidates",
	}

	peeringcandidates, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Flavors", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(peeringcandidates)

}

func GetSinglePeeringCandidate(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	candidateName := vars["name"]
	if candidateName == "" {
		http.Error(w, "Candidate name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "advertisement.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "peeringcandidates",
	}

	pcandidate, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), candidateName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Peering Candidate or Peering Candidate Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pcandidate)
}
