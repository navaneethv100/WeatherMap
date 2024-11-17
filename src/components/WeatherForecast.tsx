import { ForecastData, WeatherCondition } from '@/api/types'
import React from 'react'
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ArrowUp, Droplets, Wind } from 'lucide-react';
import { ArrowDown } from 'lucide-react';

interface WeatherForecastProps {
    data: ForecastData
}

interface DailyForecast {
    temp_min: number;
    temp_max: number;
    humidity: number;
    wind: number;
    weather: WeatherCondition;
    date: number;
}


const WeatherForecast = ({data}: WeatherForecastProps) => {
    const dailyForcast = data.list.reduce((acc, forecast) =>{
        const date = format(new Date(forecast.dt * 1000), "yyyy-MM-dd");
        if(!acc[date]){
            acc[date] = {
                temp_min: forecast.main.temp_min,
                temp_max: forecast.main.temp_max,
                humidity: forecast.main.humidity,
                wind: forecast.wind.speed,
                weather: forecast.weather[0],
                date: forecast.dt,
            };
        }else{
            acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
            acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
        }
        return acc;
    }, {} as Record<string, DailyForecast>);

    const nextDays = Object.values(dailyForcast).slice(0, 6);

    return (
    <Card>
        <CardHeader>
            <CardTitle>5 Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
            <div className='grid gap-4'>
                {nextDays.map((day)=>(
                    <div 
                        key={day.date}
                        className='grid grid-cols-3 items-center gap-4 rounded-lg border p-4'
                    >
                        <div>
                            <p
                                className='font-medium'
                            >{format(new Date(day.date*1000), "EEE, MMM d")}</p>
                            <p className='text-sm text-muted-foreground capitalize'>{day.weather.description}</p>
                        </div>
                        <div className='flex justify-center gap-4'>
                            <span className="flex items-center text-blue-500">
                                <ArrowDown className="mr-1 h-4 w-4"/>
                                {Math.round(day.temp_min)}°F
                            </span>
                            <span className="flex items-center text-red-500">
                                <ArrowUp className="mr-1 h-4 w-4"/>
                                {Math.round(day.temp_min)}°F
                            </span>
                        </div>
                        <div className='flex justify-end gap-4'>
                            <span className='flex items-center text-muted-foreground'>
                                <Droplets className='h-4 w-4 text-blue-500'/>
                                <span className='text-sm'>{day.humidity}%</span>
                            </span>
                            <span className='flex items-center gap-1'>
                                <Wind className="flex items-center gap-1">
                                    <span className='h-4 w-4 text-blue-500'>{day.wind} mph</span>
                                </Wind>
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
  )
}

export default WeatherForecast