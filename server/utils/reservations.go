package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

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

func GetSingleReservation(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	reservationName := vars["name"]
	if reservationName == "" {
		http.Error(w, "Reservation name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "reservation.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "reservations",
	}

	reservation, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), reservationName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Reservation or Reservation Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(reservation)
}

func AddReservation(w http.ResponseWriter, r *http.Request) {

	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	var reservationData map[string]interface{}
	err = json.NewDecoder(r.Body).Decode(&reservationData)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		log.Printf("Invalid request payload: %v", err)
		return
	}

	gvr_pc := schema.GroupVersionResource{
		Group:    "advertisement.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "peeringcandidates",
	}

	pcandidate, err := clientset.Resource(gvr_pc).Namespace("fluidos").Get(r.Context(), reservationData["peeringCandidate"].(string), metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Peering Candidate or Peering Candidate Not Found", http.StatusInternalServerError)
		return
	}
	//log.Print(unstructured.NestedMap(pcandidate.Object, "spec", "flavor", "spec", "owner"))
	ownerData, found, err := unstructured.NestedMap(pcandidate.Object, "spec", "flavor", "spec", "owner")
	if !found || err != nil {
		http.Error(w, "Invalid Seller info", http.StatusBadRequest)
		return
	}

	// Retrieve Seller information from Candidate
	seller := models.OwnershipInfo{
		Domain: ownerData["domain"].(string),
		IP:     ownerData["ip"].(string),
		NodeID: ownerData["nodeID"].(string),
	}

	// Retrieve Buyer information from ConfigMap
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
	buyerData, found, err := unstructured.NestedMap(cm.Object, "data")
	if !found || err != nil {
		http.Error(w, "Invalid Buyer info", http.StatusBadRequest)
		return
	}
	buyer := models.OwnershipInfo{
		Domain: buyerData["domain"].(string),
		IP:     buyerData["ip"].(string),
		NodeID: buyerData["nodeID"].(string),
	}

	reservation := models.Reservation{
		Name:             reservationData["name"].(string),
		SolverID:         reservationData["solverId"].(string),
		FlavorType:       reservationData["flavorType"].(string),
		CPU:              reservationData["cpu"].(string),
		Memory:           reservationData["memory"].(string),
		Pods:             reservationData["pods"].(string),
		PeeringCandidate: reservationData["peeringCandidate"].(string),
		Reserve:          reservationData["reserve"].(bool),
		Buy:              reservationData["buy"].(bool),
		Seller:           seller,
		Buyer:            buyer,
	}

	reservationResource := models.NewReservation(reservation)
	log.Print(reservationResource)

	gvr := schema.GroupVersionResource{
		Group:    "reservation.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "reservations",
	}

	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), reservationResource, v1.CreateOptions{})

	if err != nil {
		http.Error(w, "Failed to create Reservation", http.StatusInternalServerError)
		log.Printf("Failed to create Reservation: %v", err)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"message": "Reservation created successfully"})

}
