import React, { useEffect, useState } from 'react'

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(()=>{
        const getUser =()=>{
            setIsLoading(true);
            const url = 'https://jsonplaceholder.typicode.com/users'
            fetch(url)
            .then( res => res.json())
            .then(data => {
                setUsers(data);
                console.log(data);
                setIsLoading(false);
            })
            .catch((err)=>{
                setIsError(err.message);
            })
        }
        getUser()
    },[])
    const tableHeader =()=>{
        return Object.keys(users[0]).map(attr => <th key ={attr}>{attr.toUpperCase()}</th>)
    }
    const tableRows =()=>{
        return users.map(user =>{
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{`${user.address.street}, ${user.address.city}`}</td>
                    <td>{user.phone}</td>
                    <td>{user.website}</td>
                    <td>{user.company.name}</td>
                </tr>
            )
        }) 
    }
    return (
        <div>
            <h1>Users Table</h1>
            {
                users.length> 0 ? (
                    <table>
                        <thead>
                            <tr>
                                {tableHeader()}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows()}
                        </tbody>
                    </table>
                ):(
                    <div>
                        No users.
                    </div>
                )
            }
        </div>
    )
}

export default Users
