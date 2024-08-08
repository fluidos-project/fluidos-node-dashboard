package main

import (
	"log"
	"net/http"

	"server/utils"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	corsRouter := utils.EnableCors(router)

	router.HandleFunc("/api/flavors", utils.GetFlavors).Methods("GET")
	router.HandleFunc("/api/discoveries", utils.GetDiscoveries).Methods("GET")
	router.HandleFunc("/api/reservations", utils.GetReservations).Methods("GET")
	router.HandleFunc("/api/contracts", utils.GetContracts).Methods("GET")
	router.HandleFunc("/api/transactions", utils.GetTransactions).Methods("GET")
	router.HandleFunc("/api/solvers", utils.GetSolvers).Methods("GET")
	router.HandleFunc("/api/peeringcandidates", utils.GetPeeringCandidates).Methods("GET")
	router.HandleFunc("/api/allocations", utils.GetAllocations).Methods("GET")

	log.Println("Server is starting on port 3001...")
	log.Fatal(http.ListenAndServe(":3001", corsRouter))
}
