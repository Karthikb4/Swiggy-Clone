// import { REST_LIST } from "../utils/mock_data";  NO NEED TO IMPORT AS USING FETCH API ;
import RestroCard, { withOfferlabel } from "./RestroCard";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useResturantList from "../utils/useResturantList";
import UserContext from "../utils/UserContext";
import ThemeContext from "../utils/ThemeContext";

function showRatingfilter() {}
const BodyComp = () => {
  let { OriginalList, setOriginalList, ListOfRest, setRestList } = useResturantList();
  // console.log(OriginalList);
  let [Searchtxt, setSearchtxt] = useState("");

  const ResturantCardWithOffer = withOfferlabel(RestroCard);

  function filterRest() {
    const filteredList = OriginalList.filter((res) => res.info.avgRating > 4.3);
    setRestList(filteredList);
  }

  function SearchResults() {
    const filteredList = OriginalList.filter((res) =>
      res.info.name.toLowerCase().includes(Searchtxt.toLowerCase())
    );
    setRestList(filteredList);
  }

  useEffect(() => {
    console.log(Searchtxt);
    SearchResults();
  }, [Searchtxt]);
  function updateSearchtxt(event) {
    setSearchtxt(event.target.value); // if i remove this then i cant type anything on the input text and why ? becuase the search txt variable is not getting updating ; and when anything typed it is calling onchange function ;
    // console.log(Searchtxt);
  }

  // CONDITIONAL RENDERING

  // if i dont have the onChange for the inputText ; then we cant type anything ;
  // we dont put FetchList.lenth==0 because if i have searched something then and the result lead fetchlist array=0 ; then  it will show shimmer giving the user a felling that something is being loaded lets wait ; no
  const onlineStatus = useOnlineStatus();
  if (onlineStatus == false) {
    return (
      <h1> Ypur connection is interuptted , you went to offline !!!!!!</h1>
    );
  }

  const { setUserName, loggedInUser } = useContext(UserContext);
  const {theme}= useContext(ThemeContext);

  return OriginalList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="">
      <div className="body-conatiner   mx-5 my-3 text-sm ">
        {/* {console.log("again re-rendered")} */}
        <div className="search flex  ">
          <div className="search-container">
            <input
              id="search-input"
              data-testid="SearchInput"
              type="text"
              placeholder="What resturant u want to search "
              value={Searchtxt}
              onChange={updateSearchtxt}
              className= {` p-2  w-60 border rounded-md shadow-xl  bg-amber-50  ${theme=="dark"?"bg-black shadow-lg border-amber-50 text-white shadow-indigo-950":"border-black bg-green-100 drop-shadow-md"}`}
            />
            <button
              className={`m-3 px-5 py-2  rounded-md cursor-pointer  ${theme=="dark"?"bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white":"bg-blue-500 drop-shadow-md text-black"}`}
              onClick={SearchResults}
            >
              Search
            </button>
          </div>

          <div className="filter flex items-center">
            <button
              className={`m-3 px-5 py-2 rounded-md cursor-pointer ${theme=="dark"?"bg-indigo-500 shadow-lg shadow-indigo-500/50 text-white":"bg-green-400 drop-shadow-md text-black "}`}
              onClick={filterRest}
              onMouseOver={showRatingfilter}
            >
              Top Rated Resturants
            </button>
          </div>

          <div>
            <label htmlFor="userName" className={`${theme=="dark"?"text-white":"text-black"}`}>UserName</label>
            <input
              id="userName"
              className={`border w-60 h-8 m-3 rounded-md  p-2 shadow-xl  ${theme=="dark"?"bg-black shadow-lg border-amber-50 text-white shadow-indigo-950":"border-black bg-gray-100 drop-shadow-md "}` } 
              // placeholder="Enter ur Name"
              value={loggedInUser}
              type="text"
              maxLength="15"
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
        </div>

        <div className="Restro-container flex flex-wrap   justify-start mx-4 my-4 gap-10">
          {ListOfRest.map((resturant) => (
            <Link
              to={"/resturants/" + resturant.info.id}
              key={resturant.info.id}
              className="block w-fit h-fit"
            >
              {Object.keys(resturant.info.aggregatedDiscountInfoV3 || {})
                .length ? (
                <ResturantCardWithOffer resdata={resturant} />
              ) : (
                <RestroCard resdata={resturant} />
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BodyComp;
