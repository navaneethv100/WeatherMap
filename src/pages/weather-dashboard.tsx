import CurrentWeather from '@/components/current-weather';
import HourlyTemperature from '@/components/hourly-temperature';
import WeatherSkeleton from '@/components/loading-skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useGeolocation } from '@/hooks/use-geolocation';
import { useReverseGeocodeQuery, useWeatherQuery, useForecastQuery } from '@/hooks/use-weather';
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import WeatherDetails from '@/components/weather-details';
import WeatherForecast from '@/components/WeatherForecast';

function WeatherDashboard() {
  const {
    coordinates, 
    error: locationError, 
    isLoading: locationLoading, 
    getLocation } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
    
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }
  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        <p>{locationError}</p>
        <Button 
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          className="w-fit p-2"
        >
          <MapPin className="mr-2 h-4 w-4" />
          Enable Location
        </Button>  
      </AlertDescription>
    </Alert>
  }
  if (!coordinates) {
    return <Alert variant={"destructive"}>
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        <p>Please enable location access to see your local weather.</p>
        <Button 
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
        >
          <MapPin className="mr-2 h-4 w-4" />
        </Button>  
      </AlertDescription>
    </Alert>
  }

  const locationName = locationQuery.data?.[0];

  if (weatherQuery.error || forecastQuery.error) {
    return <Alert variant={"destructive"}>
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="flex items-center gap-2">
        <p>Failed to fetch weather data. Please try again.</p>
        <Button 
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Retry
        </Button>  
      </AlertDescription>
    </Alert>
  }
  if (!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton />;
  }

  return (
    <div className='space-y-4'>
      {/* Favourite Cities */}
      <div className='flex items-center justify-between'>
        <h1 className='text-xl font-bold tracking-tight'>My Location</h1>
        <Button
          variant = {"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >
          <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />
        </Button>
      </div>
      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <CurrentWeather 
            data={weatherQuery.data}
            locationName={locationName}
          />
          <HourlyTemperature 
            data={forecastQuery.data}
          />
        </div>
        <div className='grid gap-6 sm:grid-cols-2 items-start'>
          {/* Details of Weather */}
          <WeatherDetails data={weatherQuery.data}/>
          {/* Forecast */}
          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard;