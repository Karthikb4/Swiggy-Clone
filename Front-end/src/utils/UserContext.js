import { createContext } from "react";

const UserContext= createContext({
    loggedInUser:"Default User",
    name:"wefew",
});

export default UserContext