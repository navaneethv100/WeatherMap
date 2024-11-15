export interface Coordinates{
    lat: number;
    long: number;
}

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    }
    wind: {
        speed: number;
        deg: number;
    }
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    }
    timezone: number;
    id: number;
    name: string;
    cod: number;
}


export interface ForecastData{
    list: Array<{
        dt: number;
        main: WeatherData["main"];
        weather: WeatherData["weather"];
        wind: WeatherData["wind"];
        dt_txt: string;
    }>
    city: {
        name: string;
        country: string;
        timezone: number;
        sunset: number;
    };
}

export interface GeocodingResponse{
    name: string;
    local_names: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}