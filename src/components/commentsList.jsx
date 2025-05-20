import React from "react";

const CommentsList = ({ comments, deleteComment}) => (
  <ul className="comments-list">
    {comments.map(e => (
      <li key={e.comment_id} className="comment">
        <p className="author-and-date-comment-posted">
          <strong>{e.author}</strong> on{' '}
          {new Date(e.created_at).toLocaleDateString()}
        </p>
        <p>{e.body}</p>
        <button
          className="delete-button"
          aria-label="delete-comment"
          onClick={() => deleteComment(e.comment_id)}>
          Delete Comment
        </button>
      </li>
    ))}
  </ul>
);

export default CommentsList
