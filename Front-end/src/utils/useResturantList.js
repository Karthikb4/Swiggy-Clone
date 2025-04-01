import React, { useState,useEffect } from "react";
import { RESTURANT_API } from "../utils/constants";

const useResturantList = () => {
  const [ListOfRest, setRestList] = useState([]);
  const [OriginalList, setOriginalList] = useState([]);

  useEffect(() => {
    console.log("rendered for first time");
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(RESTURANT_API); // returns a result of the promise; not the promise itself
    // console.log(data);
    const json = await data.json(); // return the result of the promise ; not the promise itself
    console.log(json);
    let resturants_data_fetched = [];
    for (let i = 0; i < json?.data?.cards.length; i++) {
      const potentialData =
        json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants;
      if (potentialData) {
        resturants_data_fetched = potentialData;
        break; // Stop when we find valid data
      }
    }
    // = json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];  // set Default Fallback Value If the data is sometimes missing, provide a default value ([] for an empty list):
    // console.log(resturants_data_fetched);
    setOriginalList(JSON.parse(JSON.stringify(resturants_data_fetched)));
    setRestList(JSON.parse(JSON.stringify(resturants_data_fetched))); // deep copy
    // optional chaining
  };
  return { OriginalList, setOriginalList, ListOfRest, setRestList };
};

export default useResturantList;
