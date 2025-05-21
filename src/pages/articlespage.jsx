import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CommentsForm from "../components/commentsForm";
import CommentsList from '../components/commentsList';

const ArticlesPage = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`https://my-seeding-nc-project.onrender.com/api/articles/${article_id}`),
      axios.get(`https://my-seeding-nc-project.onrender.com/api/articles/${article_id}/comments`)
    ])
    .then(([articleRes, commentsRes ]) => {
      setArticle(articleRes.data.article)
      setComments(commentsRes.data.comments)
    })
    .catch(error => {
        setError(error.response ? `Error ${error.response.status}` : error.message);
      })
      .finally(() => setLoading(false));
    }, [article_id]);

    const handleVote = (vote) => {
    axios.patch(`https://my-seeding-nc-project.onrender.com/api/articles/${article_id}`, { inc_votes: vote})
    .then(({ data: { article: updatedArticle }}) => {
        setArticle(updatedArticle)
    })
    .catch(error => {
        console.error(error)
    })
  }

    const deleteComments = (comment_id) => {
      axios.delete(`https://my-seeding-nc-project.onrender.com/api/comments/${comment_id}`)
      .then(() => {
        setComments(current => current.filter(curr => curr.comment_id !== comment_id))
      })
      .catch(error => {
        console.error(error)
      }) 
    }
  

    if (loading) {
      return <p className="loading-article-text">Loading article</p>
    }

    if (error) {
      return <p className="error-article-text">{error}</p>
    }

   return (
    <article className="article-container">
      <nav className="article-location">
        <Link to="/">Home</Link>
        <Link to={`/topics/${article.topic}`}> {article.topic}</Link>
      </nav>

      <header className="article-header">
        <h1>{article.title}</h1>
        <p className="article-author">
          by {article.author} in{' '}
          <Link to={`/topics/${article.topic}`}>{article.topic}</Link> on {' '}
          {new Date(article.created_at).toLocaleDateString()}
        </p>
      </header>

      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={article.title}
          className="article-image"
        />
      )}

      <section className="article-body">
        {article.body.split().map((parameter, index) => (
          <p key={index}>{parameter}</p>
        ))}
      </section>

      <section className='comments'>
        <h2 id="comments-header">Comments</h2>
        <CommentsForm
        article_id={article_id}
        addComment={newComment => setComments([newComment, ...comments])}
        />
        <section className="article-votes">
        <button
          aria-label="like-article"
          onClick={() => handleVote(1)}>
            👍
        </button>
        <span className="total-votes">{article.votes}</span>
        <button
          aria-label="unlike-article"
          onClick={() => handleVote(-1)}>
            👎
        </button>
      </section>
        <Link to="#comments" className="comment-link">
        {comments.length} Comments
        </Link>
        <CommentsList 
        comments={comments}
        deleteComment={deleteComments}
        />
      </section>
    </article>
  );

};

export default ArticlesPage;