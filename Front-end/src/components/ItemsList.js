import { MENU_FOOD_IMG_URL } from "../utils/constants";
import vegIcon from "../assets/veg-icon.png";
import bestSeller from "../assets/best-seller.png";
import nonVegIcon from "../assets/non-veg-icon.png";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const ItemsList = ({data,headingID}) => {
  const { theme } = useContext(ThemeContext);
  console.log(data);

  const dispatch = useDispatch();
  const handleAddItem = (item) => {
    console.log("Item added");
    dispatch(addItem(item));
  };

  return (
    <div id={headingID + "-content"} aria-labelledby={headingID}>
      <div className=" flex flex-col  ">
        {data.map((item) => {
          return (
            <div
              data-testid="foodItems"
              key={item?.card?.info?.id}
              className={` flex justify-between  font-sans my-2 rounded-xl ${
                theme == "dark"
                  ? "  border border-white shadow-2xl text-white"
                  : "shadow-xl"
              }`}
            >
              <div className=" flex flex-col  m-1  gap-0.5 items-start p-3 mt-2 text-left">
                <div className="">
                  <img
                    className=" w-[30px] h-[30px] inline-block"
                    src={
                      item.card.info.itemAttribute.vegClassifier === "VEG"
                        ? vegIcon
                        : nonVegIcon
                    }
                  />

                  {item?.card?.info?.isBestseller ? (
                    <img className="w-[85px] inline-block " src={bestSeller} />
                  ) : null}
                </div>
                <span className="text-[15px]"> {item.card.info.name}</span>
                <span className="text-[15px]">
                  {" "}
                  &#x20B9;{" "}
                  {item.card.info.price / 100 ||
                    item.card.info.defaultPrice / 100}
                </span>
                <span className="text-[13px] text-green-700">
                  {" "}
                  {Object.keys(item?.card?.info?.ratings.aggregatedRating)  
                    .length
                    ? `⭐ ${item?.card?.info?.ratings.aggregatedRating.rating} (${item?.card?.info?.ratings.aggregatedRating.ratingCount})`
                    : ""}
                </span>
                <p className="font-[200] text-[12px]">
                  {" "}
                  {item?.card?.info?.description}
                </p>
              </div>
              <div className="w-[130px] h-[150px] z-1  shrink-0 relative my-4 ">
                {item?.card?.info?.imageId ? (
                  <div>
                    <img
                      className={`${
                        item?.card?.info?.nextAvailableAtMessage
                          ? "grayscale"
                          : ""
                      } rounded-md z-1  w-full h-[120px] object-cover bg-gray-400 `}
                      src={MENU_FOOD_IMG_URL + item?.card?.info?.imageId}
                    />
                    {item?.card?.info?.nextAvailableAtMessage ? (
                      <p className=" text-green-500 z-20 bg-gray  shadow-md -gray-300  rounded-md text-start text-xs">
                        {item?.card?.info?.nextAvailableAtMessage}
                      </p>
                    ) : (
                      <button
                        className=" text-green-500 z-20 bg-white absolute left-1/2 bottom-2 -translate-x-1/2 shadow-md -gray-300 px-7 rounded-md py-1 text-md font-semibold cursor-pointer hover:bg-gray-200 "
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    className=" text-green-500 z-20 bg-white absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 shadow-md -gray-300 px-7 rounded-md py-1 text-md font-semibold cursor-pointer hover:bg-gray-200 "
                    onClick={() => handleAddItem(item.card.info.name)}
                  >
                    ADD
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ItemsList;

// nextAvailableAtMessage
