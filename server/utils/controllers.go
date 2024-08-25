package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
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

	pcandidate, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), reservationName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Reservation or Reservation Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(pcandidate)
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

func GetSingleSolver(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	solverName := vars["name"]
	if solverName == "" {
		http.Error(w, "Solver name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "solvers",
	}

	solver, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), solverName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Solver or Solver Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(solver)
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
		Group:    "reservation.fluidos.eu",
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

func GetSingleContract(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	vars := mux.Vars(r)
	contractName := vars["name"]
	if contractName == "" {
		http.Error(w, "Contract name is required", http.StatusBadRequest)
		return
	}

	gvr := schema.GroupVersionResource{
		Group:    "reservation.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "contracts",
	}

	solver, err := clientset.Resource(gvr).Namespace("fluidos").Get(r.Context(), contractName, metav1.GetOptions{})
	if err != nil {
		http.Error(w, "Failed to get Contract or Contract Not Found", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(solver)
}

func GetNodeInfo(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	metricsGVR := schema.GroupVersionResource{
		Group:    "metrics.k8s.io",
		Version:  "v1beta1",
		Resource: "nodes",
	}

	nodesGVR := schema.GroupVersionResource{
		Group:    "",
		Version:  "v1",
		Resource: "nodes",
	}

	metrics, err := clientset.Resource(metricsGVR).List(r.Context(), v1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list node metrics", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	nodes, err := clientset.Resource(nodesGVR).List(r.Context(), v1.ListOptions{})
	if err != nil {
		http.Error(w, "Failed to list nodes", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	nodeMap := make(map[string]map[string]string)

	for _, node := range nodes.Items {
		metadata := node.Object["metadata"].(map[string]interface{})
		name := metadata["name"].(string)

		status := node.Object["status"].(map[string]interface{})
		capacity := status["capacity"].(map[string]interface{})

		cpuTotal := capacity["cpu"].(string)
		memoryTotal := capacity["memory"].(string)

		nodeMap[name] = map[string]string{
			"cpu_total":    cpuTotal,
			"memory_total": memoryTotal,
		}
	}

	var nodeUsages []models.NodeUsage
	for _, item := range metrics.Items {
		metadata := item.Object["metadata"].(map[string]interface{})
		name := metadata["name"].(string)

		usage := item.Object["usage"].(map[string]interface{})
		cpuUsage := usage["cpu"].(string)
		memoryUsage := usage["memory"].(string)

		cpuTotal := nodeMap[name]["cpu_total"]
		memoryTotal := nodeMap[name]["memory_total"]

		// Converti il valore della CPU da nanosecondi a milli-core
		cpuUsageNano, err := strconv.ParseInt(strings.TrimSuffix(cpuUsage, "n"), 10, 64)
		if err != nil {
			log.Printf("Failed to parse CPU usage for node %s: %v", name, err)
			continue
		}
		cpuUsageMilli := cpuUsageNano / 1_000_000

		cpuTotalInt, err := strconv.Atoi(cpuTotal)
		if err != nil {
			log.Printf("Failed to parse total CPU for node %s: %v", name, err)
			continue
		}
		cpuTotalMilli := int64(cpuTotalInt * 1000)

		// Converti la memoria da Ki a byte
		memoryUsageKi, err := strconv.ParseInt(strings.TrimSuffix(memoryUsage, "Ki"), 10, 64)
		if err != nil {
			log.Printf("Failed to parse memory usage for node %s: %v", name, err)
			continue
		}

		memoryTotalKi, err := strconv.ParseInt(strings.TrimSuffix(memoryTotal, "Ki"), 10, 64)
		if err != nil {
			log.Printf("Failed to parse total memory for node %s: %v", name, err)
			continue
		}

		cpuUsagePerc := float64(cpuUsageMilli) / float64(cpuTotalMilli) * 100
		memoryUsagePerc := float64(memoryUsageKi) / float64(memoryTotalKi) * 100

		nodeUsage := models.NodeUsage{
			Name:            name,
			CPUUsage_m:      cpuUsageMilli,
			CPUTotal_m:      cpuTotalMilli,
			CPUUsagePerc:    cpuUsagePerc,
			MemoryUsage_Ki:  memoryUsageKi,
			MemoryTotal_Ki:  memoryTotalKi,
			MemoryUsagePerc: memoryUsagePerc,
		}

		nodeUsages = append(nodeUsages, nodeUsage)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(nodeUsages)
}
