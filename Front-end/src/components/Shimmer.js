import ThemeContext from "../utils/ThemeContext";
import { useContext } from "react";

const Shimmer = () => {
  const{theme}=useContext(ThemeContext);
  return (
    <>
      <div className="flex flex-start ">
        <p className=" w-[200px] h-10 bg-gray-300 rounded-md animate-pulse m-5"></p>
        <p className=" w-[200px] h-10 bg-gray-300 rounded-md animate-pulse m-5"></p>
        <p className=" w-[200px] h-10 bg-gray-300 rounded-md animate-pulse m-5"></p>
      </div>
      <div className="Shimmer-container flex flex-wrap justify-between">
        {[...Array(10)].map((_, index) => {
          return (
            <div
              key={index}
              className={` w-[200px] h-60 rounded-md animate-pulse m-5 ${theme=="dark"?"bg-white":"bg-gray-300"}`}
            ></div>
          );
        })}
      </div>
      </>
  );
};

export default Shimmer;
{/* 
// shimmer-ui 
// .Shimmer-container
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: space-around;
// 
// .Shimmer-card
//   border:1px solid black;
//   width:200px;
//   margin:5px 10px ;
//   height:300px;
//   background-color: #f0f0f0a4; */}


/** 
Understanding [...Array(10)].map((_, index) => (...)) in JSX
This syntax is used to dynamically create multiple elements in JSX without needing an existing array.

Step-by-Step Breakdown
Array(10)

This creates an empty array with a length of 10.

Example: Array(10) → [empty × 10] (It’s not an array of undefined, just empty slots.)

[...Array(10)]

The spread operator (...) converts the empty array into an actual array filled with undefined values.

Example: [...Array(3)] → [undefined, undefined, undefined]

This is necessary because map() doesn’t work on an empty array, but it works on an array with undefined values.  */
