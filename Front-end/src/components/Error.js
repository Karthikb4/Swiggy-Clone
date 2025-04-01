import {useRouteError} from "react-router-dom"

const Error= () =>{

    const err=useRouteError();
    console.log(err);
    return (
        <div>
            <h1>ERROR HAS OCCURED IN THE PAGE</h1>
            <p>Status of the Error is : {err.status}</p>
        </div>
    );
};

export default Error