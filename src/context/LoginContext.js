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
    // pagination
    // current page tracking for Posts
    const [currentPostPage, setCurrentPostPage] = useState(
        localStorage.getItem("currentPostPage")
            ? parseInt(localStorage.getItem("currentPostPage"))
            : 1
    );
    // current page tracking
    const [currentPage, setCurrentPage] = useState(
        localStorage.getItem("currentPage")
            ? parseInt(localStorage.getItem("currentPage"))
            : 1
    );
    const [itemPerPage, setItemPerPage] = useState(
        localStorage.getItem("itemPerPage")
            ? parseInt(localStorage.getItem("itemPerPage"))
            : 10
    );
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const [sortingOrder, setSortingOrder] = useState(
        localStorage.getItem("order") ? localStorage.getItem("order") : "asc"
    );
    useEffect(()=>{
        userData()
        setCurrentPostPage(
            localStorage.getItem("currentPostPage")
                ? parseInt(localStorage.getItem("currentPostPage"))
                : 1
        );
    },[])
    return(
        <Context.Provider
            value={{
                users,
                isLogIn,
                setIsLogIn,
                sessionUser,
                setSessionUser,
                currentPostPage,
                currentPage,
                sortingOrder,
                itemPerPage,
                search,
                sorting,
                setItemPerPage,
                setSearch,
                setSearch,
                setSorting,
                setCurrentPostPage,
                setCurrentPage,
                setSortingOrder,
                
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