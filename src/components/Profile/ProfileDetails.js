import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context, useGlobalContext } from '../../context/LoginContext';

const ProfileDetails = () => {
    const { isLogIn, sessionUser } = useGlobalContext(Context);
    const {id} = useParams();
    const [user, setUser] = useState({})
    const getUser = () =>{
        const existingUser = sessionStorage.getItem('currentUser')
        setUser(JSON.parse(existingUser));
    }
    console.log(user);
    useEffect(()=>{
        getUser()
    },[])
    console.log("user",user);
    return (
        <div>
           <h1>{id}</h1>
           <p>{user.name}</p>
           <p>{user.username}</p>
           <p>{user.email}</p>
           <p>{user.website}</p>
        </div>
    )
}

export default ProfileDetails
