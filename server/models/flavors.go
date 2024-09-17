// Update to support others flavorType

package models

import (
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

func CreateFlavorModel(flavorData map[string]interface{}, owner OwnershipInfo) *unstructured.Unstructured {
	// add other fields

	flavorData["spec"].(map[string]interface{})["networkPropertyType"] = "networkProperty"
	flavorData["spec"].(map[string]interface{})["owner"] = map[string]interface{}{
		"domain": owner.Domain,
		"ip":     owner.IP,
		"nodeID": owner.NodeID,
	}
	flavorData["spec"].(map[string]interface{})["providerID"] = owner.NodeID

	// Crea l'oggetto unstructured per Kubernetes
	flavor := &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "nodecore.fluidos.eu/v1alpha1",
			"kind":       "Flavor",
			"metadata": map[string]interface{}{
				"name":      flavorData["name"],
				"namespace": "fluidos",
			},
			"spec": flavorData["spec"],
		},
	}

	return flavor
}
