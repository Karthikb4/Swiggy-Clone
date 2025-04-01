import BodyComp from "../components/BodyComp";
import "@testing-library/jest-dom";
import MOCK_DATA from "../__mocks__/resListMock.json";
import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

//we are trying to make a fetch function that our browser exactly gives  us ; in oout fethc it has status code; json method  ; so we added json:()=> ... and many more but we kept what is require)
global.fetch = jest.fn(() => {
  return Promise.resolve({
    ok: true,
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should render search in body comp", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <BodyComp />
      </BrowserRouter>
    );
  });
  const searchbtn = screen.getByRole("button", { name: "Search" });

  const inputBox = screen.getByTestId("SearchInput");

  fireEvent.change(inputBox, { target: { value: "Burger" } });
  const cards = await screen.findAllByTestId("resCard"); // waits for rendering of comp
  //   console.log(searchbtn);
  //   expect(inputBox).toBeInTheDocument();
  expect(cards.length).toBe(3);
});

it("Should filter Top Rated Resturants", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <BodyComp />
      </BrowserRouter>
    );
  });
  const filterbtn = screen.getByRole("button", {
    name: "Top Rated Resturants",
  });

  await act(async () => {
    fireEvent.click(filterbtn);
  });
  const cards = screen.getAllByTestId("resCard");
  expect(cards.length).toBe(12);
});
