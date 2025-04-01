import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderComp from "../components/HeaderComp";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

describe("Header component", () => {
  it("should render the login button and chang wehnc lciked", () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <HeaderComp />
        </Provider>
      </BrowserRouter>
    );
    const btn = screen.getByRole("button", { name: "log-IN" });

    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);

    const btn2 = screen.getByRole("button", { name: "Log-OUT" });
    expect(btn2).toBeInTheDocument();
  });
});
