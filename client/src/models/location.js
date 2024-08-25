export class Location {
    constructor(data) {
      this.additionalNotes = data.additionalNotes || '';
      this.city = data.city || '';
      this.country = data.country || '';
      this.latitude = data.latitude || '';
      this.longitude = data.longitude || '';
    }
  }
  