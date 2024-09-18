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
	Type               string `json:"type,omitempty"`
	IntentID           string `json:"intentID"`
	ArchitectureFilter Filter `json:"architectureFilter,omitempty"`
	CPUFilter          Filter `json:"cpuFilter,omitempty"`
	MemoryFilter       Filter `json:"memoryFilter,omitempty"`
	PodsFilter         Filter `json:"podsFilter,omitempty"`
	FindCandidate      bool   `json:"findCandidate"`
	ReserveAndBuy      bool   `json:"reserveAndBuy"`
	EstablishPeering   bool   `json:"establishPeering"`
}

func CreateSolverResource(solverData *SolverData) *unstructured.Unstructured {
	solverResource := map[string]interface{}{
		"apiVersion": "nodecore.fluidos.eu/v1alpha1",
		"kind":       "Solver",
		"metadata": map[string]interface{}{
			"name":      solverData.Name,
			"namespace": "fluidos",
		},
		"spec": map[string]interface{}{
			"intentID":         solverData.IntentID,
			"findCandidate":    solverData.FindCandidate,
			"reserveAndBuy":    solverData.ReserveAndBuy,
			"establishPeering": solverData.EstablishPeering,
		},
	}

	selector := map[string]interface{}{}

	// Add field only if they are present. This section should be updated to supports other FlavorType
	if solverData.Type != "" {
		selector["flavorType"] = solverData.Type
	}

	filters := map[string]interface{}{}
	if solverData.ArchitectureFilter.Mode != "" {
		filters["architectureFilter"] = map[string]interface{}{
			"name": solverData.ArchitectureFilter.Mode,
			"data": createFilterData(&solverData.ArchitectureFilter),
		}
	}
	if solverData.CPUFilter.Mode != "" {
		filters["cpuFilter"] = map[string]interface{}{
			"name": solverData.CPUFilter.Mode,
			"data": createFilterData(&solverData.CPUFilter),
		}
	}
	if solverData.MemoryFilter.Mode != "" {
		filters["memoryFilter"] = map[string]interface{}{
			"name": solverData.MemoryFilter.Mode,
			"data": createFilterData(&solverData.MemoryFilter),
		}
	}
	if solverData.PodsFilter.Mode != "" {
		filters["podsFilter"] = map[string]interface{}{
			"name": solverData.PodsFilter.Mode,
			"data": createFilterData(&solverData.PodsFilter),
		}
	}

	if len(filters) > 0 {
		selector["filters"] = filters
	}

	if len(selector) > 0 {
		solverResource["spec"].(map[string]interface{})["selector"] = selector
	}

	return &unstructured.Unstructured{Object: solverResource}
}

// Helper to create filter data. Pay attention to server side validation
func createFilterData(filter *Filter) map[string]interface{} {
	data := make(map[string]interface{})

	if filter.Mode == "Match" {
		data["value"] = filter.Value
	} else if filter.Mode == "Range" {
		if filter.Min != "" {
			data["min"] = filter.Min
		}
		if filter.Max != "" {
			data["max"] = filter.Max
		}
	}

	return data
}
