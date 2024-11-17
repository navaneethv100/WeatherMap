import { useEffect, useState } from "react";
import type { Coordinates } from "../api/types";

interface GeolocationState{
    coordinates: Coordinates | null,
    error: string | null,
    isLoading: boolean,
}

export function useGeolocation() {
    const [locationData, setLocationData] = useState<GeolocationState>({
        coordinates: null,
        error: null,
        isLoading: false,
    });

    const getLocation = () => {
        setLocationData((prev)=>({...prev, isLoading: true, error: null}));
        if (!navigator.geolocation){
            setLocationData({
                coordinates: null, 
                error: "Geolocation is not supported by your browser",
                isLoading: false,
            });
            return;
        }

        navigator.geolocation.getCurrentPosition((position)=>{
            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                },
                error: null,
                isLoading: false,
            });
        }, (error)=>{
            let errorMessage = "An unknown error occurred";
            if (error.code === 1){
                errorMessage = "You have denied permission to access your location";
            } else if (error.code === 2){
                errorMessage = "The request to access your location timed out";
            }
            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false,
            });
        },{
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        });

    };

    useEffect(()=>{
        getLocation();
    }, []);

    return {...locationData, getLocation};
}