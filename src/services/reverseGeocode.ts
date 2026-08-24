import axios from "axios";

/** A locality resolved from coordinates via BigDataCloud's free, key-less
 *  reverse-geocoding endpoint (used for the "detect my location" feature). */
export interface ReverseGeocodeResult {
  city?: string;
  locality?: string;
  countryName?: string;
  principalSubdivision?: string;
}

export const reverseGeocode = async (
  latitude: number,
  longitude: number
): Promise<ReverseGeocodeResult> => {
  const response = await axios.get<ReverseGeocodeResult>(
    "https://api.bigdatacloud.net/data/reverse-geocode-client",
    {
      params: { latitude, longitude, localityLanguage: "en" },
      timeout: 8000,
    }
  );

  return response.data;
};
