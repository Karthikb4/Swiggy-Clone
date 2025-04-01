import {useState,useEffect} from "react";

const useOnlineStatus=()=>{

    const [onlineStatus,setOnlineStatus]=useState(true); //true means user is online

   const handleOnline= ()=>{
        setOnlineStatus(true); // re-renders the component ; 
    }

    const handleOffline=()=>{
        
        setOnlineStatus(false); // re-renders the component ; 
    }

    useEffect(()=>{
        window.addEventListener("online",handleOnline);
        window.addEventListener("offline",handleOffline);
        return ()=>{
            window.removeEventListener("online",handleOnline);
            window.removeEventListener("offline",handleOffline);
        }
    },[])
    
    return onlineStatus;
}

export default useOnlineStatus; 