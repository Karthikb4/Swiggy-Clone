import { useDispatch, useSelector } from "react-redux";
import ItemsList from "./ItemsList";
import { emptyCart } from "../utils/cartSlice";
import { useContext } from "react";
import ThemeContext from "../utils/ThemeContext";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items); // for reading cart info we need to subscribe to the store
  const { theme } = useContext(ThemeContext);
  console.log(cartItems);
  const dispatch = useDispatch();
  const ClearCart = () => {
    console.log("Cart cleared");
    // console.log(store.getState().cart); // Before dispatching
    dispatch(emptyCart());
    // console.log(store.getState().cart); // After dispatching
  };
  return (
    <div className="text-center bord  er m-4 p-4 font-bold flex flex-col  ">
      <div className={`${theme==="dark"? "text-white" :"text-black"}` }>
        <h1>ITEMS ADDED INTO THE CART</h1>
        <button
          className="p-2 m-2 cursor-pointer font-bold self-center"
          onClick={ClearCart}
        >
          {" "}
          Clear Cart
        </button>
      </div>
      <div className=" w-6/12 m-auto  ">
        {cartItems.length === 0 ? (
          <h1 className={`${theme==="dark"? "text-white" :"text-black"}` }>CART IS EMPTY ADD ITEMS TO THE CART </h1>
        ) : (
          <ItemsList data={cartItems} />
        )}
      </div>
    </div>
  );
};
export default Cart;
