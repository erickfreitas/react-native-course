const GOOGLE_API_KEY = 'XXXXXXXX';

export function getMapPreviewUrl(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  console.log(imagePreviewUrl);
  return imagePreviewUrl;
}

export async function getAddress(lat, lng) {
  const addressUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=street_address&key=${GOOGLE_API_KEY}`;

  const response = await fetch(addressUrl);

  if(!response.ok) {
    throw new Error('Could not fetch address!');
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  console.log(address);
  return address;
}