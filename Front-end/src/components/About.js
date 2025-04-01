import React from "react";
import UserClass from "./UserClass";

class About extends React.Component {
  constructor(props) {
    super(props);
    console.log("PARENT CONSTRUCTOR");
  }
  componentDidMount() {
    console.log("Parent has Mounted");
  }
  render() {
    console.log("parent render called");
    return (
      <>
        <UserClass name="1" location="IND" comp_name="Google"/>
        <span>Hi i am in between them</span>
        <UserClass name="2" location="AUS" comp_name="MICROSOFT"/>
      </>
    );
  }
}

export default About;
