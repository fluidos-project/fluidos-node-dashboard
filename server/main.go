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

	router.HandleFunc("/api/discoveries", utils.GetDiscoveries).Methods("GET")

	router.HandleFunc("/api/reservations", utils.GetReservations).Methods("GET")
	router.HandleFunc("/api/reservations/{name}", utils.GetSingleReservation).Methods("GET")

	router.HandleFunc("/api/contracts", utils.GetContracts).Methods("GET")
	router.HandleFunc("/api/contracts/{name}", utils.GetSingleContract).Methods("GET")

	router.HandleFunc("/api/transactions", utils.GetTransactions).Methods("GET")
	router.HandleFunc("/api/transactions/{name}", utils.GetSingleTransaction).Methods("GET")

	router.HandleFunc("/api/solvers", utils.GetSolvers).Methods("GET")
	router.HandleFunc("/api/solvers/{name}", utils.GetSingleSolver).Methods("GET")

	router.HandleFunc("/api/peeringcandidates", utils.GetPeeringCandidates).Methods("GET")
	router.HandleFunc("/api/peeringcandidates/{name}", utils.GetSinglePeeringCandidate).Methods("GET")

	router.HandleFunc("/api/allocations", utils.GetAllocations).Methods("GET")
	router.HandleFunc("/api/allocations/{name}", utils.GetSingleAllocation).Methods("GET")

	router.HandleFunc("/api/nodes", utils.GetNodeInfo).Methods("GET")

	distDir := "./dist"

	// Gestisci le richieste per i file statici nella cartella assets
	router.PathPrefix("/assets/").Handler(http.StripPrefix("/assets/", http.FileServer(http.Dir(filepath.Join(distDir, "assets")))))

	// Gestisci tutte le altre richieste reindirizzandole a index.html
	router.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Costruisci il percorso del file richiesto
		path := filepath.Join(distDir, r.URL.Path)

		// Controlla se il file esiste
		if _, err := os.Stat(path); os.IsNotExist(err) || err != nil {
			// Se il file non esiste, serve index.html
			http.ServeFile(w, r, filepath.Join(distDir, "index.html"))
		} else {
			// Se il file esiste, servilo direttamente
			http.FileServer(http.Dir(distDir)).ServeHTTP(w, r)
		}
	})

	log.Println("Server is starting on port 3001...")
	log.Fatal(http.ListenAndServe(":3001", corsRouter))
}
