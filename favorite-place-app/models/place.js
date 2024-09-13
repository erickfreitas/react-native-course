class Place {
  constructor(title, imageUri, location) {
    this.id = new Date().toString() + Math.random().toString()
    this.title = title
    this.imageUri = imageUri
    this.address = location.address
    this.location = { lat: location.lat, lng: location.lng } // { lat: 1, lng: 1 }
  }
}

export default Place