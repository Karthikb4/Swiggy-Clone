import { render,screen } from "@testing-library/react";
import Contact from "../components/Contact"
import "@testing-library/jest-dom"


test("Should load the Contact page and button ",()=>{
    // contact render
    render(<Contact/>);

    // got the headings in the document
    const heading= screen.getByRole("heading");
    // console.log(heading);

    const button= screen.getByText("Submit");

    //assertion
    expect(heading).toBeInTheDocument(heading); 
    expect(button).toBeInTheDocument(button);
})