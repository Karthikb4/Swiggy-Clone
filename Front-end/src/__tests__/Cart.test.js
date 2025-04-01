//  i will add element in the resturant menu ; is it updating in the cart-0 items an  the cart page
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import MOCK_DATA_MENU from "../__mocks__/resMenuDataMock.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import ResturantMenu from "../components/ResturantMenu";
import HeaderComp from  "../components/HeaderComp"
import Cart from "../components/Cart"

jest.mock("../assets/veg-icon.png", () => "test-file-stub");
jest.mock("../assets/best-seller.png", () => "test-file-stub");
jest.mock("../assets/non-veg-icon.png", () => "test-file-stub");

global.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(MOCK_DATA_MENU),
  });
});

it("should load resturant menu component", async () => {
  await act(async () => {
    render(
      <Provider store={appStore}>
        <BrowserRouter>
         <HeaderComp/>
          <ResturantMenu />
          <Cart/>
        </BrowserRouter>
      </Provider>
    );
  });

  const accordinHeading = screen.getByText("North Indian Combos (3)");
  fireEvent.click(accordinHeading); // aria-expanded of the accordian

  const FoodItems = screen.getAllByTestId("foodItems");

  expect(FoodItems.length).toBe(3);

  const addbtn= screen.getAllByRole("button",{name:"ADD"});

  fireEvent.click(addbtn[0]); // clicked on the first button ; now the header should be "cart-1 items"

  expect(screen.getByText("Cart (1)")).toBeInTheDocument();

  // checking the cart page 
  expect(screen.getAllByTestId("foodItems").length).toBe(4); // 1 is the added one and rest3 are from the ResturantMenu opend one ; as the cart and resturant menu and header are alll loaded in one page


    //clear the cart and check it should be 3 the above one
    fireEvent.click(screen.getByRole("button",{name: "Clear Cart"}));
    expect(screen.getAllByTestId("foodItems").length).toBe(3);
    expect(screen.getByText("CART IS EMPTY ADD ITEMS TO THE CART")).toBeInTheDocument();
});
