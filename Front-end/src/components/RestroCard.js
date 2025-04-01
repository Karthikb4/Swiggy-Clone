import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const RestroCard = (props) => {
  const { resdata } = props;
  // console.log(resdata);
  const { name, cloudinaryImageId, costForTwo, cuisines, avgRating } = resdata.info;
  const { deliveryTime } = resdata.info.sla;
  const {theme}=useContext(ThemeContext);

  return (
    <div className={` flex-col w-[200px] break-words rounded-sm  hover:drop-shadow-lg ${theme=="dark"?"bg-black text-white border border-amber-50":"bg-[#f0f0f0] hover:bg-gray-200 "}`}>
      <div className="p-3 " data-testid="resCard">
        <img
          className="w-full h-[150px] p-2 rounded-[8%]"
          // i found the first part of the link by seeing the picture in a newtabl ; ffor all images the first part was same the last one was its cloudimaginaryid
          src={
            "https://media-assets.swiggy.com/swiggy/image/upload/" +
            cloudinaryImageId
          }
          alt="resturant image"
        />

        <h3 className="rest-name text-sm mb-3">{name}</h3>
        <h4 className="">{cuisines.join(",")}</h4>
        <h4 className="">Rating: {avgRating}</h4>
        <h4 className="">Delivery in {deliveryTime}</h4>
        <h4 className="">{costForTwo}</h4>
      </div>
    </div>
  );
};


export const withOfferlabel=(WrappedComp)=>{
  return(props)=>{
    const {theme}=useContext(ThemeContext);
    const { resdata } = props;
    return (
      <div className="relative ">
        <div className={`absolute z-1 border rounded-md p-1 left-1/2 -translate-x-1/2 -translate-y-1 bg-black text-white whitespace-nowrap inline-block `}>{resdata.info.aggregatedDiscountInfoV3.header + " "+ resdata.info.aggregatedDiscountInfoV3.subHeader}</div> 
        <WrappedComp {...props}/>
      </div>
    )
  }
}

export default RestroCard;