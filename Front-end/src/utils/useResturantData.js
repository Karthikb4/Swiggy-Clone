import { useState,useEffect, useContext } from "react";
import { MENU_API } from "../utils/constants";
import LocationContext from "./LocationContext";

const useResturantData = (resId) => {
  const [resMenu, setResMenu] = useState(null);
  const [resDetails, setResDetails] = useState(null);
  const [categoryList, setCategoryList] = useState(null);
  const {lng,lat}=useContext(LocationContext);
  // "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&  from here lat=20.2942254&lng=85.744396&restaurantId=";

  useEffect(() => {
    fetcMenu();
  }, []);

  const fetcMenu = async () => {
    const menu = await fetch(`${MENU_API}lat=${lat}&lng=${lng}&restaurantId=${resId}`);
    const json = await menu.json();
    console.log(json);
    setResMenu(json); // so that it gets scheduled before
    for (let i = 0; i < json?.data?.cards?.length; i++) {
      const potentialData = json.data.cards[i].card.card.info;
      if (potentialData) {
        setResDetails(potentialData);
        // console.log(potentialData);
        break;
      }
    }
    for (let i = 0; i < json?.data?.cards?.length; i++) {
      const potentialData =
        json?.data?.cards[i]?.groupedCard?.cardGroupMap?.REGULAR;
      if (potentialData) {
        setCategoryList(potentialData);
        console.log(potentialData);
        break;
      }
    }
  }

  return { resDetails, categoryList ,setCategoryList };
};

export default useResturantData;
