package models

import (
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

type Allocation struct {
	Name     string `json:"name"`
	IntentID string `json:"intentID"`
	Contract string `json:"contract"`
}

func NewAllocation(data *Allocation) *unstructured.Unstructured {
	allocation := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "nodecore.fluidos.eu/v1alpha1",
			"kind":       "Allocation",
			"metadata": map[string]interface{}{
				"name":      data.Name,
				"namespace": "fluidos",
			},
			"spec": map[string]interface{}{
				"contract": map[string]interface{}{
					"name":      data.Contract,
					"namespace": "fluidos",
				},
			},
		},
	}
	return allocation
}
