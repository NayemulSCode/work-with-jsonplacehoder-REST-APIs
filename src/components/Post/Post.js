import React, { useState } from 'react'
import {Link} from 'react-router-dom'
function Post(props) {
    const [isClick, setIsClick] = useState(false);
    const {title,body,id} = props.posts;
    const stylePost ={
        margin: '20px',
        padding: '20px',
        textAlign: 'center',
        boxShadow: '1px 1px 5px',
        borderRadius: '5px'

    }
    // regular expression 
    const shortBody = body.replace(/<(.|\n)*?>/g, "");
    const subBody = shortBody.substring(0, 120) + '...';
    return (
        <div style={stylePost}>

           <Link to={`/post/${id}`}><h3>{title}</h3></Link> 
            {
                isClick ? 
                    <span>{body}</span>
                :
                <span>{subBody}</span> 
            }
            <span style={{cursor:'pointer', color: 'green'}} onClick={ ()=>{setIsClick(true)}}>{ isClick ? <span></span>: <span>read more</span>}</span>
        </div>
    )
}

export default Post
