import RestroCard from "../components/RestroCard";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import MOCK_DATA from "../__mocks__/resDataMock.json";

it("Shpuld render the resturant card", () => {
  render(<RestroCard resdata={MOCK_DATA} />);
  const resName = screen.getByText("Afiya Delight The Restaurant");

  expect(resName).toBeInTheDocument();
});
