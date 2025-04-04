import React, { Suspense, lazy, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import HeaderComp from "./components/HeaderComp";
import BodyComp from "./components/BodyComp";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Contact from "./components/Contact";
import Error from "./components/Error";
import About from "./components/About";
import ResturantMenu from "./components/ResturantMenu";
import UserContext from "./utils/UserContext";
import ThemeContext from "./utils/ThemeContext";
import appStore from "./utils/appStore";
import {Provider}from "react-redux"
import LocationContext from "./utils/LocationContext";
import Shimmer from "./components/Shimmer";


const Grocery = lazy(() => import("./components/Grocery"));
console.log(Grocery);

const Cart=lazy(()=> import("./components/Cart"));
console.log(Cart);

const AppLayout = () => {
  const { loggedInUser } = useContext(UserContext);
  const [userName, setUserName] = useState(loggedInUser);
  const [themeMode, setThemeMode] = useState("light");
  const {lng,lat}=useContext(LocationContext);
  const [location,setlocation]=useState({lat:null,lng:null});
  useEffect(() => {
    // autentiction making api call
    
    const data = {
      name: "Karthik",
    };
    setUserName(data.name);
    //getting the location
    navigator.geolocation.getCurrentPosition((position)=>{
      setlocation({
        lat:position.coords.latitude,
        lng:position.coords.longitude
      });
    }, (error)=>{
      console.log("Failed to fetch Location",error);
    })

  }, []);
  console.log(`lat=${location.lat}  lng=${location.lng}`)

  

  return location.lat===null ?<Shimmer/>:(
    <Provider store={appStore}>
      {console.log("entered")}
      <LocationContext.Provider value={{lat:location.lat ,lng:location.lng}}>
      <ThemeContext.Provider value={{ theme: themeMode, setThemeMode }}>
        <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
          <div className="app ">
            {/* we want this header comp not to reload again for every route of which invloves rendereding the app layout component */}
          <div className="fixed z-10 left-0 right-0 top-0"><HeaderComp /></div> 
            <div className={` mt-[75px] h-[calc(100vh-75px)] overflow-auto ${themeMode==="dark"?"bg-black":"bg-white"}`}> <Outlet /> </div>
          </div>
        </UserContext.Provider>
      </ThemeContext.Provider>
      </LocationContext.Provider>
    </Provider>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <BodyComp />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Page is Loading</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path:"/cart",
        element: <Suspense fallback={<h1>CART PAGE IS LOADING</h1>}>
          <Cart/>
        </Suspense>
      },
      {
        path: "/resturants/:resId",
        element: <ResturantMenu />,
      },
     
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
