import React, { useEffect, useState } from 'react'

const SingleUserPosts = ({id}) => {
    const [posts, setPosts] = useState([])
    useEffect(async()=>{
        const posts = await fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
        const data = await posts.json()
        setPosts(data);
    },[])
    // form show after click button
    const [showForm, setShowForm] = useState(false)
    const showFormFiled = (e) =>{
        e.preventDefault()
        setShowForm(true);
    }
    // set data for create post
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [createPost, setCreatePost] = useState({});
    console.log(createPost);
    const handleFormSubmit =(e)=>{
        e.preventDefault();
        if(title && description && id){
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                  id: 1,
                  title: title,
                  body: description,
                  userId: id,
                }),
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
              })
                .then((response) => response.json())
                .then((created) => {
                    setCreatePost(created);
                    setTitle("");
                    setDescription("");
                })
        }
        else{
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: title,
                    body: description,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((created) => {
                    setCreatePost(created)
                    setTitle("");
                    setDescription("");
                });
        }
        
    }
    // update post
    const [editForm, setEditFrom] = useState(false);
    const handleEditData=(id)=>{
        console.log(id);
        setEditFrom(true);
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then((response) => response.json())
            .then((json) => {
                setTitle(json.title);
                setDescription(json.body);
            });
        
    }
    // delete post
    const handleRemovePost = (id)=>{
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
          })
          .then(() => setPosts(posts.filter((post)=> post.id !== id)))
    }
    const userPostWrapper={
        backgroundColor: '#f8f9fa'
    }
    const userPostStyle= {
        backgroundColor: '#e6e3ef8f',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '8px',
        display:"flex",
    }
    
    return (
        <div className="container " style={userPostWrapper}>
            <form>
                {
                    showForm ? <></>: <button className="btn btn-info" onClick={showFormFiled}>Create Post</button>
                }
            </form>
            {
                showForm || editForm ?(
                    <form onSubmit={handleFormSubmit}>
                        <label>Title </label>
                        <input className="form-control" value={title} type="text" onChange={(e)=> setTitle(e.target.value)} />
                        <label>Description </label>
                        <input className="form-control" type="text" value={description} onChange={(e)=> setDescription(e.target.value)} />
                        
                        <button className="btn btn-primary my-2" type="submit" >{editForm? "Update": "Create"}</button>
                    </form>
                ):(<></>)
            }
            <h3>All Posts</h3>
            {/* show create post */}
            <div style={userPostStyle} >
                <div>
                    <h4 style={{color: 'gray', textTransform:'capitalize'}}>{createPost.title}</h4>
                    <p>{createPost.body}</p>
                </div>
            </div>
            
            {
                posts.map((post, index) =>{
                    return <div style={userPostStyle} key={index} className="d-flex align-items-center">
                        <div style={{width:'85%'}}>
                            <h4 style={{color: 'gray', textTransform:'capitalize'}}>{post.title}</h4>
                            <p>{post.body}</p>
                        </div>
                        <div style={{width:'15%'}}>
                            <button onClick={()=>handleEditData(post.id)} className="btn btn-info mx-1">Edit</button>
                            <button onClick={()=>handleRemovePost(post.id)} className="btn btn-danger">Delete</button>
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default SingleUserPosts
