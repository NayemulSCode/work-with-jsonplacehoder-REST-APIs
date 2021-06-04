import React, { useEffect, useState } from 'react'
import Post from './Post';

function Posts() {
    const [post, setPost] = useState([]);
    const [next, setNext] = useState(10)
    const [postToShow, setPostToShow] = useState([])
    const [loading, setLoading] = useState(false);
    const postsPerPage = 10;
    let holdingPosts = [];
    // slice part
    const loopWithSlice = (start, end) =>{
        const slicePosts = post.slice(start, end);
        holdingPosts = [...holdingPosts, ...slicePosts];
        setPostToShow(holdingPosts);
    }
    const handleShowPosts = () =>{
        loopWithSlice(0, next+postsPerPage);
        setNext(next + postsPerPage);
    }
    // fetch data from end point jsonplaceholder
    const fetchData = () =>{
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(posts => {
            setPost(posts)
            // set initial Slice
            setPostToShow(posts.slice(0, postsPerPage));
            setLoading(false);
        });
    }
    useEffect(() => {
        fetchData();
    }, [])
    const buttonStyle={
        padding: '15px 10px',
        marginBottom:'10px',
        backgroundColor: '#e9edef',
        borderRadius: '50px',
        fontSize: '16px'
       
    }
    return (
        <div style={{textAlign:'center'}}>
            {
                postToShow.map((posts, index) => <Post key={index} posts = {posts}></Post>)
            }
            <button style={buttonStyle} onClick={handleShowPosts}>{loading? 'Loading...': 'Show More'}</button>
        </div>
    )
}

export default Posts
