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
  let { resDetails, categoryList, setCategoryList } = TotalResDetails;

  const { theme } = useContext(ThemeContext);

  //   console.log(categoryList?.cards);
  if (categoryList == null) return <Shimmer />;
  // if(resMenu!=null)
  const { name, cuisines, costForTwoMessage } = resDetails;
  //filtering only the itemcards , not the nestedone also
  categoryList = categoryList.cards.filter((cat) => {
    if (
      cat.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" ||
      cat.card.card["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
    )
      return true;
    return false;
  });
  // setCategoryList(newcategoryList);
  //   console.log(categoryList);
  //   console.log(categoryList?.card?.card);
  return (
    <div
      className={`text-center  ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <h1 className=" text-[1.2rem] my-2 font-bold">{name}</h1>
      <p className=" text-sm my-2 font-bold">
        {cuisines.join(",")} - {costForTwoMessage}
      </p>
      {/* controlled Component */}
      {categoryList.map((cat, ind1) => {
          return cat?.card?.card?.itemCards ? (
            <CategoryAccordin
            key={`category-${ind1}`} // Unique key for top-level categories
              data={cat?.card?.card}
              showItems={`category-${ind1}` === showIndex ? true : false}
              setShowIndex={() => setShowIndex(`category-${ind1}`)}
              currentIndex={showIndex}
              index={`category-${ind1}`}
              setShowIndexNULL={() => setShowIndex(null)}
            />
          ) : (
            cat?.card?.card?.categories?.map((cat, ind2) => (
              <CategoryAccordin
                key={`subcategory-${ind1}-${ind2}`} // Unique key using both indices
                data={cat}
                showItems={`subcategory-${ind1}-${ind2}` === showIndex ? true : false}
                setShowIndex={() => setShowIndex(`subcategory-${ind1}-${ind2}`)}
                currentIndex={showIndex}
                index={`subcategory-${ind1}-${ind2}`}
                setShowIndexNULL={() => setShowIndex(null)}
              />
            ))
          );
      })}
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
