import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

const ContextProvider = ({children}) =>{
    const [users, setUsers] = useState([]);
    const [isLogIn, setIsLogIn] = useState(
        sessionStorage.getItem("currentUser") ? true: false
    );
    const [sessionUser, setSessionUser] = useState(
        sessionStorage.getItem("currentUser") ? JSON.parse(sessionStorage.getItem("currentUser")) : {}
    )
    const userData = async() =>{
        const response = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await response.json()
        setUsers(data);
    }
    useEffect(()=>{
        userData()
    },[])
    return(
        <Context.Provider
            value={{
                users,
                isLogIn,
                setIsLogIn,
                sessionUser,
                setSessionUser,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(Context);
}
export { Context, ContextProvider};