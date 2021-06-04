import React, { useEffect, useState } from 'react'

const Comment = ({id}) => {
    const [comment, setComment] = useState([])
    useEffect( async()=>{
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        const data = await response.json()
        setComment(data)
        console.log(data);
    },[])
    const commentStyles={
        boxShadow: '1px 1px 5px',
        padding: '5px 5px'
    }
    return (
        <div>
            <small>{comment.length} comments</small>
            {
                comment.map( (cmnt, index) => {
                    return (<div style={commentStyles} key={index} >
                        <h4>{cmnt.email}</h4>
                    <p>{cmnt.body}</p>
                    </div>)
                })
            }
        </div>
    )
}

export default Comment
