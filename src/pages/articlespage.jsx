import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ArticlesPage = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      axios.get(`https://my-seeding-nc-project.onrender.com/api/articles/${article_id}`),
    ])
    .then(([articleRes]) => {
      setArticle(articleRes.data.article)
    })
    .catch(err => {
        setError(err.response ? `Error ${err.response.status}` : err.message);
      })
      .finally(() => setLoading(false));
    }, [article_id]);

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
    </article>
  );
};


export default ArticlesPage;