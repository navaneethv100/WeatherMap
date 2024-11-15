import { API_CONFIG } from "./config"
import { Coordinates, WeatherData, ForecastData, GeocodingResponse } from "./types"

class WeatherAPI{
    private createUrl(
        endpoint: string,
        params: Record<string, string | number>
    ){
        const searchParams = new URLSearchParams({
            appid: API_CONFIG.API_KEY,
            ...params,
        })
        return `${endpoint}?${searchParams.toString()}`
    }
    private async fetchData<T>(url: string): Promise<T>{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Failed to fetch data")
        }
        return response.json()
    }
    async getCurrentWeather({lat, long}: Coordinates): Promise<WeatherData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: long.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })
        return this.fetchData<WeatherData>(url)
    }
    async getForecast({lat, long}: Coordinates): Promise<ForecastData>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: long.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units,
        })
        return this.fetchData<ForecastData>(url)
    }
    async reverseGeocode({lat, long}: Coordinates): Promise<GeocodingResponse[]>{
        const url = this.createUrl(`${API_CONFIG.BASE_URL}/reverse`, {
            lat: lat.toString(),
            lon: long.toString(),
            limit: 1,
        })
        return this.fetchData<GeocodingResponse[]>(url)
    }
}

export const weatherAPI = new WeatherAPI()

