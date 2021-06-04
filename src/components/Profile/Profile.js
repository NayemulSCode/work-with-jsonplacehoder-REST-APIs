import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { Context, useGlobalContext } from '../../context/LoginContext'

const Profile = () => {
    const {users, isLogIn, setIsLogIn} = useGlobalContext(Context);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [loginError, setLoginError] = useState(false);
    console.log(users);
    const history = useHistory();
    const handleLogin =(e)=>{
        e.preventDefault();
        let currentLoginUser = {};
        currentLoginUser = users.find((user) => user.email === email && user.username === userName);
        console.log(currentLoginUser);
        if(currentLoginUser){
            setIsLogIn(true)
            sessionStorage.setItem("currentUser", JSON.stringify(currentLoginUser))
            // sessionStorage.setItem("isLogIn", JSON.stringify(isLogIn))
            alert(`user login successfully done!`)
            history.push(`/user/${currentLoginUser.id}`)
        }
        else{
            setLoginError(true)
            alert(`incorrect login information try Again`)
        }
    }
    useEffect(()=>{
        sessionStorage.setItem("isLogIn", JSON.stringify(isLogIn))
    })
    return (
        <div>
            <form className="row g-3">
            <div className="col-auto">
                    <label htmlFor="Email">User Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={userName} 
                        placeholder="User Name" 
                        onChange={(e)=> setUserName(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <label htmlFor="Email">Email</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={email}
                        placeholder="Email" 
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </div>
                
                <div className="col-auto">
                    <button onClick={handleLogin} type="submit" className="btn btn-primary mb-3">Log In</button>
                </div>
            </form>
            <div>
                <h4>demo login information</h4>
                <p>usrname: Antonette</p>
                <p>email: Shanna@melissa.tv</p>
            </div>
        </div>
    )
}

export default Profile
