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
		http.Error(w, "Failed to get Flavor", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(flavor)
}

// retrieve all Discovery
func GetDiscoveries(w http.ResponseWriter, r *http.Request) {
	// not useful to show, it's a temporary resource
	//not implemented in the current version
}

// retrieve all Peering Candidates
func GetPeeringCandidates(w http.ResponseWriter, r *http.Request) {

	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	//path to Flavor
	gvr := schema.GroupVersionResource{
		Group:    "advertisement.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "peeringcandidates",
	}

	// retrieve Flavor from API
	peeringcandidates, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Flavors", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	// Send the JSON
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(peeringcandidates)

}

// retrieve all Reservations
func GetReservations(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "reservation.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "reservations",
	}

	reservations, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Reservations", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reservations)
}

// retrieve all Transactions
func GetTransactions(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "reservation.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "transactions",
	}

	transactions, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Reservations", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(transactions)

}

// retrieve all Solvers
func GetSolvers(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "solvers",
	}

	solvers, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Solvers", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(solvers)

}

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

// retrieve all Contracts
func GetContracts(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "contracts",
	}

	contracts, err := clientset.Resource(gvr).List(r.Context(), metav1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list Contracts", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(contracts)
}

func TestFlavorHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("TestFlavorHandler reached")
	vars := mux.Vars(r)
	flavorName := vars["name"]
	w.Write([]byte("Test for flavor: " + flavorName))
}
