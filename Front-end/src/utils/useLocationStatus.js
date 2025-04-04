import { useState, useEffect } from "react";

const useLocationStatus = () => {
  let [location, setlocation] = useState({ lng: null, lat: null });
  useEffect(fetchlocation, []);
  const fetchlocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error Getting Location: ", error);
        }
      );
    }
    else {
        console.error("Geolocation is not supported by this browser.");
    }
  };
  return location;
};

export default useLocationStatus;
