package models

type NodeUsage struct {
	Name            string  `json:"name"`
	CPUUsage_m      int64   `json:"cpu_usage_m"`       // CPU usage in milli-core
	CPUTotal_m      int64   `json:"cpu_total_m"`       // Total CPU in milli-core
	CPUUsagePerc    float64 `json:"cpu_usage_perc"`    // CPU usage percentage
	MemoryUsage_Ki  int64   `json:"memory_usage_Ki"`   // Memory usage in Ki
	MemoryTotal_Ki  int64   `json:"memory_total_Ki"`   // Total memory in Ki
	MemoryUsagePerc float64 `json:"memory_usage_perc"` // Memory usage percentage
}
