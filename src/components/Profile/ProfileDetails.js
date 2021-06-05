import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Context, useGlobalContext } from '../../context/LoginContext';
import SingleUserComments from '../Comment/SingleUserPosts';
import SingleProfile from './SingleProfile';

const ProfileDetails = () => {
    const { users } = useGlobalContext(Context);
    const {id} = useParams();
    const [user, setUser] = useState({})
    const getUser = async() =>{
        let existingUser = await users.find( (user) => user.id === parseInt(id))
        setUser(existingUser);
    }
    console.log(user);
    useEffect(()=>{
        getUser()
    },[id, users])
    return (
        <div className="">
            <SingleProfile user={user} />
            <SingleUserComments id = {id} />
        </div>
    )
}

export default ProfileDetails
