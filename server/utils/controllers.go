package utils

import (
	"encoding/json"
	"fmt"
	"net/http"

	modelsAdvertisement "github.com/fluidos-project/node/apis/advertisement/v1alpha1"
	modelsNodecore "github.com/fluidos-project/node/apis/nodecore/v1alpha1"
)

// retrieve Flavors
func GetFlavors(w http.ResponseWriter, r *http.Request) {
	client, err := GetKubernetesClient()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	customResourceClient := client.clientset.RESTClient()
	result := &modelsNodecore.FlavourList{}
	err = customResourceClient.Get().
		AbsPath("/apis/nodecore.fluidos.eu/v1alpha1").
		Resource("flavors").
		Do(r.Context()).
		Into(result)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting Flavours: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// retrieve Discovery
func GetDiscoveries(w http.ResponseWriter, r *http.Request) {
	client, err := GetKubernetesClient()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	customResourceClient := client.clientset.RESTClient()
	result := &modelsAdvertisement.DiscoveryList{}
	err = customResourceClient.Get().
		AbsPath("/apis/advertisement.fluidos.eu/v1alpha1").
		Resource("discoveries").
		Do(r.Context()).
		Into(result)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error getting Discoveries: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(result); err != nil {
		http.Error(w, fmt.Sprintf("Error encoding response: %v", err), http.StatusInternalServerError)
	}
}

// retrieve PeeringCandidates
func GetPeeringCandidates(w http.ResponseWriter, r *http.Request) {

}

// retrieve Contracts
func GetContracts(w http.ResponseWriter, r *http.Request) {

}

// retrieve Reservations
func GetReservations(w http.ResponseWriter, r *http.Request) {

}

// retrieve Transactions
func GetTransactions(w http.ResponseWriter, r *http.Request) {

}

// retrieve Solvers
func GetSolvers(w http.ResponseWriter, r *http.Request) {

}

// retrieve Allocations
func GetAllocations(w http.ResponseWriter, r *http.Request) {

}
