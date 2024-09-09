package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"

	"github.com/gorilla/mux"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

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

// create a new solver request

func AddSolver(w http.ResponseWriter, r *http.Request) {
	config := KubernetesConfig()

	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	var solverData models.SolverData
	if err := json.NewDecoder(r.Body).Decode(&solverData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	solverResource := models.CreateSolverResource(&solverData)
	/*log.Println("JSON")
	log.Println(solverData)
	log.Println("Resource")
	log.Println(solverResource)*/

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "solvers",
	}

	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), solverResource, metav1.CreateOptions{})
	if err != nil {
		http.Error(w, "Failed to create Solver", http.StatusInternalServerError)
		log.Println(err)
		return
	}
	//log.Print(err)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Solver Request created successfully"})
}

/*
func AddSolver(w http.ResponseWriter, r *http.Request) {

	config := KubernetesConfig()
	clientset, err := dynamic.NewForConfig(config)
	if err != nil {
		log.Fatalf("Failed to create dynamic client: %v", err)
	}

	var solverData map[string]interface{}
	if err := json.NewDecoder(r.Body).Decode(&solverData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	archData, found, err := unstructured.NestedMap(solverData, "architectureFilter")
	if !found || err != nil {
		http.Error(w, "Invalid architecture info", http.StatusBadRequest)
		return
	}
	architecture := models.Filter{
		Mode:  archData["mode"].(string),
		Value: archData["value"].(string),
	}

	cpuData, found, err := unstructured.NestedMap(solverData, "cpuFilter")
	if !found || err != nil {
		http.Error(w, "Invalid cpu info", http.StatusBadRequest)
		return
	}
	cpu := models.Filter{
		Mode:  cpuData["mode"].(string),
		Value: cpuData["value"].(string),
		Min:   cpuData["min"].(string),
		Max:   cpuData["max"].(string),
	}

	memoryData, found, err := unstructured.NestedMap(solverData, "memoryFilter")
	if !found || err != nil {
		http.Error(w, "Invalid memory info", http.StatusBadRequest)
		return
	}
	memory := models.Filter{
		Mode:  memoryData["mode"].(string),
		Value: memoryData["value"].(string),
		Min:   memoryData["min"].(string),
		Max:   memoryData["max"].(string),
	}

	podData, found, err := unstructured.NestedMap(solverData, "podsFilter")
	if !found || err != nil {
		http.Error(w, "Invalid pod info", http.StatusBadRequest)
		return
	}
	pod := models.Filter{
		Mode:  podData["mode"].(string),
		Value: podData["value"].(string),
		Min:   podData["min"].(string),
		Max:   podData["max"].(string),
	}

	solver := models.SolverData{
		Name:               solverData["name"].(string),
		Type:               solverData["type"].(string),
		IntentID:           solverData["intentID"].(string),
		ArchitectureFilter: architecture,
		CPUFilter:          cpu,
		MemoryFilter:       memory,
		PodsFilter:         pod,
		FindCandidate:      solverData["findCandidate"].(bool),
		ReserveAndBuy:      solverData["reserveAndBuy"].(bool),
		EstablishPeering:   solverData["establishPeering"].(bool),
	}
	log.Println(solver)

	solverResource := models.CreateSolverResource(&solver)

	log.Println(solverResource)

	gvr := schema.GroupVersionResource{
		Group:    "nodecore.fluidos.eu",
		Version:  "v1alpha1",
		Resource: "solvers",
	}

	_, err = clientset.Resource(gvr).Namespace("fluidos").Create(r.Context(), solverResource, metav1.CreateOptions{})

	if err != nil {
		http.Error(w, "Failed to create Solver", http.StatusInternalServerError)
		log.Println(err)
		return
	}

	//log.Print(err)

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{"message": "Solver Request created successfully"})

}
*/
