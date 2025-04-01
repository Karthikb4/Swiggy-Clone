import React from "react";
const Contact=()=>{
    return(
        <div>
            <h1>Contact US PAGE </h1>
            <form>
                <input className="border p-2 m-2" placeholder="Name" type="text"></input>
                <input className="border p-2 m-2" type="text" placeholder="message"></input> 
                <button className=" border p-2 m-2"type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Contact;