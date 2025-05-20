import React, { useState } from 'react';
import axios from 'axios';

const AddComments = ({ article_id, addComment }) => {
    const [body, setBody] = useState("")
    const [error, setError] = useState(null)

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`https://my-seeding-nc-project.onrender.com/api/articles/${article_id}/comments`, 
            {username: "King Mittens 1st", body })
            .then(({ data: { comment }}) => {
                addComment(comment)
                setBody("")
                setError(null)
            })
            .catch(e => {
                console.error(e)
                setError("comment did not post")
            })
    }

    return (
        <form onSubmit={handleSubmit} className='add-comments-to-form'>
            <label htmlFor='new comment' className='hidden'>Add comments</label>
            <textarea id='new-comment' value={body} onChange={e => setBody(e.target.value)} required
             placeholder='post-a-comment-here '/>
             {error && <p className="error-text">{error}</p>}
             <button type="submit">Submit</button>
        </form>
    )
}

export default AddComments