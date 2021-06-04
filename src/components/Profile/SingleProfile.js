import React from 'react'

const SingleProfile = ({user}) => {
    const shortName = () =>{
        let subName;
        if(user?.name){
            return subName =  user?.name.slice(0,1);
        }
    }
    
    
    const styleProfilePic = {
       
        padding: '10px',
        backgroundColor: 'gray',
        borderRadius: '50%',
        border: '1px solid black',
        fontSize: '20px',
        fontWeight: '700',
    }
    return (
        <div className="container">
            <div>
                <p><span style={styleProfilePic}>{shortName()} </span>{user?.name}</p>
            </div>
            <hr />
           <div>
            <p>User Name: {user?.username}</p>
            <p>Email: {user?.email}</p>
            <p>Website: {user?.website}</p>
           </div>
        </div>
    )
}

export default SingleProfile
