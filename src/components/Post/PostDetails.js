import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import Comment from '../Comment/Comment';

const PostDetails = () => {
    const [isLoading, setIsLoading] = useState(false)
    let {id} = useParams()
    const [post, setPost] = useState({});
    useEffect( async()=>{
        setIsLoading(true)
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const data = await response.json();
        setPost(data);
        setIsLoading(false)
    },[])
    if(isLoading){
        <div>Loading....</div>
    }
    const commentStyle={
        marin: '20px',
        padding: '5px',
        border: '1px solid black'
    }
    return (
        <div style={{margin:'20px'}}>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <hr />
            <div style={commentStyle}>
                <h3>Comments</h3>
                <Comment id = {id} />
            </div>
        </div>
    )
}

export default PostDetails

