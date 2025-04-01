import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useResturantData from "../utils/useResturantData";
import CategoryAccordin from "./CategoryAccordin";
import { useContext, useState } from "react";
import ThemeContext from "../utils/ThemeContext";

const ResturantMenu = () => {
  const { resId } = useParams(); // it return an object in the format of {resturantId: 10203} ; hence whatever the variable in the dynamic route it was mentioned with here also use the same in the destructing of the object.
  const [showIndex, setShowIndex] = useState(null);
  const TotalResDetails = useResturantData(resId);
  let { resDetails, categoryList } = TotalResDetails;

  const{theme}= useContext(ThemeContext);

//   console.log(categoryList?.cards);
  if (categoryList == null) return <Shimmer />;
  // if(resMenu!=null)
  const { name, cuisines, costForTwoMessage } = resDetails;
  //filtering only the itemcards , not the nestedone also
  categoryList = categoryList.cards.filter((cat) => {
    if (
      cat.card.card["@type"] ===
      "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    )
      return true;
    return false;
  });
//   console.log(categoryList);
//   console.log(categoryList?.card?.card);
  return (
    <div className= {`text-center  ${theme=="dark"?"text-white":"text-black"}`}>
      <h1 className=" text-[1.2rem] my-2 font-bold">{name}</h1>
      <p className=" text-sm my-2 font-bold">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {/* controlled Component */}
      {categoryList.map((cat, ind) => (
        <CategoryAccordin
          key={ind}
          data={cat.card.card}
          showItems={ ind === showIndex ? true : false}
          setShowIndex={()=> setShowIndex(ind)}
          currentIndex={showIndex}
          index={ind}
          setShowIndexNULL={()=> setShowIndex(null)}
        />
      ))}
    </div>
  );
};

export default ResturantMenu;

/**
 * json?.data?.cards[2 or 3] -> fetch this
 * json?.data?.cards[2 or 3]?.info.name
 * json?.data?.cards[2 or 3]?.info.costForTwoMessage
 * json?.data?.cards[2 or 3]?.info.cuisines;
 *
 *
 *
 * json?
 * json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card.card.title; -> gives titile of category
 * json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[i]?.card.card.itemCards; -> is an array of the items in that category
 * json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[i]?.card.card.itemCards[i].card.info.name; -> is an array of the items in that category
 * json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[i]?.card.card.itemCards[i].card.info.itemAttribute.vegClassifier  -> "NONVEG" or "VEG"
 */
