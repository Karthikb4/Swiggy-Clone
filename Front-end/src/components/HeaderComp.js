import { APPLOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import ThemeContext from "../utils/ThemeContext";
import { useSelector } from "react-redux";

const HeaderComp = () => {
  let [loginStatus, SetLoginStatus] = useState(false);
  function changeLoginStatus() {
    // if(loginStatus==0)
    //   this.textContent="LOG-IN";
    // else  this.textContent="LOG-OUT"
    SetLoginStatus(!loginStatus);
    // console.log(loginStatus ? "log-out" : "log-in");
  }
  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);
  const { theme, setThemeMode } = useContext(ThemeContext);

  const cartItems = useSelector((store) => store.cart.items);
  // console.log(cartItems);

  return (
    <div className="  header flex justify-between  h-[75px] bg-[rgba(225,249,106,1)]  shadow-lg text-sm">
      <div className="logo-container ">
        <img className="logo w-18" src={APPLOGO_URL} alt="logo" />
      </div>
      <div className=" items-center Nav-container ">
        <ul className="flex p-2 m-2 ">
          <li className="px-3 mx-1 ">
            <div
              className="w-4.5 h-full rounded-[50%] "
              style={{ backgroundColor: onlineStatus ? `green` : `red` }}
            ></div>
          </li>
          <li className="px-3 mx-1 ">
            <Link to="/">Home</Link>
          </li>
          <li className="px-3 mx-1 ">
            <Link to="/about">About</Link>
          </li>
          <li className="px-3 mx-1">
            <Link to="/contact">Contact US</Link>
          </li>
          <li className="px-3 mx-1">
            <Link to="/cart">Cart ({cartItems.length})</Link>
          </li>
          <li className="px-3 mx-1">
            <Link to="/grocery">Grocery</Link>
          </li>
          <button
            style={{ backgroundColor: loginStatus ? "pink" : "red" }}
            className="login-btn  "
            onClick={changeLoginStatus}
          >
            {loginStatus ? "Log-OUT" : "log-IN"}
          </button>
          <li className="px-3 mx-1">{data.loggedInUser}</li>

          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={() => {
                if (theme === "dark") setThemeMode("light");
                else setThemeMode("dark");
                console.log(theme);
              }}
            />
            <div
              className={`${
                theme == "dark"
                  ? "peer-checked:after:bg-white"
                  : " after:bg-black "
              } relative w-11 h-6 bg-gray-200  rounded-full peer dark:bg-gray-100 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:bg-black after:start-[2px]  after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-900 peer-checked:bg-blue-900 dark:peer-checked:bg-black `}
            ></div>
            <span className="ms-3 text-sm font-medium text-pink-900 dark:text-pink-900"></span>
          </label>
        </ul>
      </div>
    </div>
  );
};

export default HeaderComp;
