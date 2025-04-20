export async function reverseGeocode(lat, lng) {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
    const data = await response.json();
    const cityOrTown = data.address.city || data.address.town  || data.address.village || data.address.suburb || "";
    console.log(data.address)
    return `${data.address.road}${cityOrTown == "" ? "" : ","} ${cityOrTown}`
  }