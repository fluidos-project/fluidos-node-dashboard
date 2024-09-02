package models

import "k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"

type Filter struct {
	Mode  string `json:"mode"`
	Min   string `json:"min,omitempty"`
	Max   string `json:"max,omitempty"`
	Value string `json:"value,omitempty"`
}

type SolverData struct {
	Name               string `json:"name"`
	Type               string `json:"type"`
	IntentID           string `json:"intentID"`
	ArchitectureFilter Filter `json:"architectureFilter"`
	CPUFilter          Filter `json:"cpuFilter"`
	MemoryFilter       Filter `json:"memoryFilter"`
	PodsFilter         Filter `json:"podsFilter"`
	FindCandidate      bool   `json:"findCandidate"`
	ReserveAndBuy      bool   `json:"reserveAndBuy"`
	EstablishPeering   bool   `json:"establishPeering"`
}

// Funzione per creare la risorsa Solver
func CreateSolverResource(solverData *SolverData) *unstructured.Unstructured {
	// Mappa i dati dal JSON in una struttura che rappresenta la risorsa Solver in Kubernetes
	solverResource := map[string]interface{}{
		"apiVersion": "nodecore.fluidos.eu/v1alpha1",
		"kind":       "Solver",
		"metadata": map[string]interface{}{
			"name":      solverData.Name,
			"namespace": "fluidos",
		},
		"spec": map[string]interface{}{
			"selector": map[string]interface{}{
				"flavorType": solverData.Type,
				"filters": map[string]interface{}{
					"architectureFilter": map[string]interface{}{
						"name": solverData.ArchitectureFilter.Mode,
						"data": createFilterData(&solverData.ArchitectureFilter),
					},
					"cpuFilter": map[string]interface{}{
						"name": solverData.CPUFilter.Mode,
						"data": createFilterData(&solverData.CPUFilter),
					},
					"memoryFilter": map[string]interface{}{
						"name": solverData.MemoryFilter.Mode,
						"data": createFilterData(&solverData.MemoryFilter),
					},
					"podsFilter": map[string]interface{}{
						"name": solverData.PodsFilter.Mode,
						"data": createFilterData(&solverData.PodsFilter),
					},
				},
			},
			"intentID":         solverData.IntentID,
			"findCandidate":    solverData.FindCandidate,
			"reserveAndBuy":    solverData.ReserveAndBuy,
			"establishPeering": solverData.EstablishPeering,
		},
	}

	return &unstructured.Unstructured{Object: solverResource}
}

// Helper per creare i dati dei filtri
func createFilterData(filter *Filter) map[string]interface{} {
	if filter.Mode == "Match" {
		return map[string]interface{}{
			"value": filter.Value,
		}
	} else if filter.Mode == "Range" {
		return map[string]interface{}{
			"min": filter.Min,
			"max": filter.Max,
		}
	}
	return nil
}
