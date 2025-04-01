import React, { useContext, useEffect, useState } from "react";
import ItemsList from "./ItemsList";
import ThemeContext from "../utils/ThemeContext";

const CategoryAccordin = ({ index, data,showItems,setShowIndex, currentIndex,setShowIndexNULL}) => {
  // console.log(data);

  // const [isOpen, setIsOpen] = useState(false);
  const { title, itemCards,} = data;
  const {theme}=useContext(ThemeContext);

  const headingID = `accordion-heading-${title.replace(/\s+/g, "-")}`; // 🔥 Generate unique ID
  // console.log(headingID);
  return (
    <div>
      <div className="w-7/12  mx-auto my-3 p-2 ">
        <h2 id={headingID} className="p-0 m-0">
          <button 
            className={`w-full p-2 cursor-pointer  ${theme==="dark"?"hover:bg-gray-900":"hover:bg-gray-200"}`}
            aria-expanded={showItems}
            aria-controls={headingID + "-content"}
            onClick={()=>{
              console.log(index);
             
              if(currentIndex == index)
              {
                setShowIndexNULL();
              }
              else setShowIndex();
              console.log(currentIndex);
            }}
          >
            <div className="  accordind-header flex justify-between items-center ">
              <span className="font-semibold text-[1rem]">
                {title} ({itemCards.length})
              </span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 shrink-0 transition-transform ${
                  showItems ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </div>
          </button>
        </h2>
        { currentIndex===index ?<hr className="mt-1"/>:null}
        {/* accordin body */}
        {showItems && <ItemsList data={itemCards} headingID={headingID} />}
        <hr className="mt-2"/>
      </div>
     
    </div>
  );
};

export default CategoryAccordin;



// the long form of  {isOpen && <ItemsList data={itemCards} headingID={headingID} />}
// if (isOpen) {
//     return <ItemsList data={itemCards} headingID={headingID} />;
//   } else {
//     return null; // Nothing will be rendered
//   }
