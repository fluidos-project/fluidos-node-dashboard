package utils

import (
	"log"
	"net/http"

	"k8s.io/client-go/rest"
	"k8s.io/client-go/tools/clientcmd"
)

func KubernetesConfig() *rest.Config {

	// it's the path of the local KUBECONFIG. it is useful to be able to use the dashboard locally on your machine in a Kind environment
	kubeconfig := "/Users/marco/Desktop/fluidosUpdate/node/tools/scripts/fluidos-consumer-1-config"

	config, err := rest.InClusterConfig()
	if err != nil {
		//log.Println("InClusterConfig not found, attempting to load kubeconfig from file...")
		config, err = clientcmd.BuildConfigFromFlags("", kubeconfig)
		if err != nil {
			log.Fatalf("Failed to create Kubernetes config: %v", err)
		}
	} else {
		//log.Println("InClusterConfig loaded successfully")
	}
	return config
}

// CORS for development
func EnableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Println("CORS middleware: handling request")
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
