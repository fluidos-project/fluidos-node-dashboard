package models

import (
	"k8s.io/apimachinery/pkg/apis/meta/v1/unstructured"
)

type Reservation struct {
	Name             string
	SolverID         string
	FlavorType       string
	CPU              string
	Memory           string
	Pods             string
	PeeringCandidate string
	Reserve          bool
	Buy              bool
	Seller           OwnershipInfo
	Buyer            OwnershipInfo
}

type OwnershipInfo struct {
	Domain string
	IP     string
	NodeID string
}

func NewReservation(reservation Reservation) *unstructured.Unstructured {
	return &unstructured.Unstructured{
		Object: map[string]interface{}{
			"apiVersion": "reservation.fluidos.eu/v1alpha1",
			"kind":       "Reservation",
			"metadata": map[string]interface{}{
				"name":      reservation.Name,
				"namespace": "fluidos",
			},
			"spec": map[string]interface{}{
				"solverID": reservation.SolverID,
				"configuration": map[string]interface{}{
					"type": reservation.FlavorType,
					"data": map[string]interface{}{
						"cpu":    reservation.CPU,
						"memory": reservation.Memory,
						"pods":   reservation.Pods,
					},
				},
				"peeringCandidate": map[string]interface{}{
					"name":      reservation.PeeringCandidate,
					"namespace": "fluidos",
				},
				"reserve":  true,
				"purchase": reservation.Buy,
				"seller": map[string]interface{}{
					"domain": reservation.Seller.Domain,
					"ip":     reservation.Seller.IP,
					"nodeID": reservation.Seller.NodeID,
				},
				"buyer": map[string]interface{}{
					"domain": reservation.Buyer.Domain,
					"ip":     reservation.Buyer.IP,
					"nodeID": reservation.Buyer.NodeID,
				},
			},
		},
	}
}
