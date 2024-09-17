package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"server/utils"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	corsRouter := utils.EnableCors(router)

	router.HandleFunc("/api/flavors", utils.GetFlavors).Methods("GET")
	router.HandleFunc("/api/flavors/{name}", utils.GetSingleFlavor).Methods("GET")
	router.HandleFunc("/api/flavors", utils.AddFlavors).Methods("POST")
	router.HandleFunc("/api/flavorsYAML", utils.AddFlavorsYAML).Methods("POST")

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

	// --- FILE SERVING FOR BUILD ---

	distDir := "./dist"

	// Manage requests for static files in the assets folder
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir(filepath.Join(distDir, "assets")))))

	// Handle all other requests by redirecting them to index.html
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Costruisci il percorso del file richiesto
		path := filepath.Join(distDir, r.URL.Path)

		// Check if the file exists
		if _, err := os.Stat(path); os.IsNotExist(err) || err != nil {
			// If the file does not exist, index.html is needed
			http.ServeFile(w, r, filepath.Join(distDir, "index.html"))
		} else {
			// If the file exists, serve it directly
			http.FileServer(http.Dir(distDir)).ServeHTTP(w, r)
		}
	})

	log.Println("Server is starting on port 3001...")
	log.Fatal(http.ListenAndServe(":3001", corsRouter))
}
