export class NetworkManagerConfigurationCM{
    constructor(json){
        this.apiVersion = json.apiVersion || '';
        this.kind = json.kind || '';
        this.data= {
            local: json.data? json.data.local.split(',').map(address => address.trim()) : [],
        };
    }
    
}