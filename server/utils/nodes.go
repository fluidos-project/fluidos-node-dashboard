package utils

import (
	"encoding/json"
	"log"
	"net/http"
	"server/models"
	"strconv"
	"strings"

	v1 "k8s.io/apimachinery/pkg/apis/meta/v1"
	"k8s.io/apimachinery/pkg/runtime/schema"
	"k8s.io/client-go/dynamic"
)

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
