import { geocodingApi } from "./axios";
import type { GeocodingResponse } from "../types/weather";

export const searchCity = async (
  city: string
): Promise<GeocodingResponse> => {
  const response = await geocodingApi.get<GeocodingResponse>("/search", {
    params: {
      name: city,
      count: 5,
      language: "en",
      format: "json",
    },
  });

  return response.data;
};
