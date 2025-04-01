import React from "react";
import { useState } from "react";
class UserClass extends React.Component{
    
    constructor(props)
    {
        super(props);
        console.log(this.props.name +" Constructor called");
        // console.log(props);
        this.state={
            count: 1,
        };
        this.IncCount=this.IncCount.bind(this);
    }
    componentDidMount(){
        console.log(this.props.name +" has mounted");
    }
    IncCount(){
        this.setState({
            count : this.state.count + 1,
        });
    }
    render(){
        const {name,location,comp_name} =this.props;
        console.log(name+ " render ");
        const {count}=this.state
        return (
            <div className="user-card">
                <h1>Count - {count}</h1>
                <button onClick={this.IncCount}>INCREASE COUNT</button>
                <p>Name is :{ name} </p>
                <p>Location is: {location}</p>
                <p>Component Name :{comp_name}</p>
            </div>
        );
    }
}
export default UserClass;