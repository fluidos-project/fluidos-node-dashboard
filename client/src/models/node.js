export class NodeInfo {
    constructor(json) {
        this.name = json.name;
        this.cpuUsageM = json.cpu_usage_m; // CPU usage in millicores
        this.cpuTotalM = json.cpu_total_m; // Total CPU available in millicores
        this.cpuUsagePerc = json.cpu_usage_perc; // CPU usage percentage
        this.memoryUsageKi = json.memory_usage_Ki; // Memory usage in KiB
        this.memoryTotalKi = json.memory_total_Ki; // Total memory available in KiB
        this.memoryUsagePerc = json.memory_usage_perc; // Memory usage percentage
    }
}