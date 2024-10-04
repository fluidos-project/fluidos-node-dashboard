package main

import (
	"log"
	"net/http"
	"time"

	"server/utils"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
	router := mux.NewRouter()

	//  CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	router.HandleFunc("/api/flavors", utils.GetFlavors).Methods("GET")
	router.HandleFunc("/api/flavors/{name}", utils.GetSingleFlavor).Methods("GET")
	router.HandleFunc("/api/flavors", utils.AddFlavors).Methods("POST")
	router.HandleFunc("/api/flavorsYAML", utils.AddFlavorsYAML).Methods("POST")
	router.HandleFunc("/api/flavors/{name}", utils.DeleteFlavor).Methods("DELETE")

	router.HandleFunc("/api/reservations", utils.GetReservations).Methods("GET")
	router.HandleFunc("/api/reservations/{name}", utils.GetSingleReservation).Methods("GET")
	router.HandleFunc("/api/reservations", utils.AddReservation).Methods("POST")

	router.HandleFunc("/api/contracts", utils.GetContracts).Methods("GET")
	router.HandleFunc("/api/contracts/{name}", utils.GetSingleContract).Methods("GET")

	router.HandleFunc("/api/transactions", utils.GetTransactions).Methods("GET")
	router.HandleFunc("/api/transactions/{name}", utils.GetSingleTransaction).Methods("GET")

	router.HandleFunc("/api/solvers", utils.GetSolvers).Methods("GET")
	router.HandleFunc("/api/solvers/{name}", utils.GetSingleSolver).Methods("GET")
	router.HandleFunc("/api/solvers", utils.AddSolver).Methods("POST")

	router.HandleFunc("/api/peeringcandidates", utils.GetPeeringCandidates).Methods("GET")
	router.HandleFunc("/api/peeringcandidates/{name}", utils.GetSinglePeeringCandidate).Methods("GET")

	router.HandleFunc("/api/allocations", utils.GetAllocations).Methods("GET")
	router.HandleFunc("/api/allocations/{name}", utils.GetSingleAllocation).Methods("GET")
	router.HandleFunc("/api/allocations", utils.AddAllocation).Methods("POST")

	router.HandleFunc("/api/metrics", utils.GetNodesMetric).Methods("GET")
	router.HandleFunc("/api/nodes", utils.GetNodes).Methods("GET")
	router.HandleFunc("/api/configmaps/{name}", utils.GetConfigMapByName).Methods("GET")
	router.HandleFunc("/api/nodes/addFluidosNode", utils.AddFluidosNodeCM).Methods("PUT")
	router.HandleFunc("/api/nodes/deleteFluidosNode/{index:[0-9]+}", utils.DeleteFluidosNode).Methods("PUT")

	server := &http.Server{
		Addr:              ":3001",
		ReadHeaderTimeout: 5 * time.Second,
		Handler:           c.Handler(router),
	}

	log.Println("Server is starting on port 3001...")
	log.Fatal(server.ListenAndServe())
}
