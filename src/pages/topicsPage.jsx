import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ArticleBox from '../components/ArticleBox';

const TopicsPage = () => {
  const { slug } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const base = 'https://my-seeding-nc-project.onrender.com/api';
    const url  = slug ? `${base}/articles?topic=${slug}`: `${base}/topics`;

    axios.get(url)
      .then(res => {
        if (slug) {
          setData(res.data.articles);
        } else {
          setData(res.data.topics);
        }
      })
      .catch(error => {
        console.error(error);
        setError('Failed to load');
      })
      .finally(() => setLoading(false));
  }, [slug]);
  
  if (loading) {
      return <p className="loading-article-text">Loading</p>
    }

  if (error) {
      return <p className="error-article-text">{error}</p>
    }

  return (
    <main className="topics-container">
      {slug ? (
        <div>
          <h1 className="page-title">Topic: {slug}</h1>
          <Link to="/topics" className="back-link">&larr; All topics</Link>

          {data.length > 0 ? (
            <ul className="article-grid">
              {data.map(article => (
                <li key={article.article_id}>
                  <ArticleBox article={article} />
                </li>
              ))}
            </ul>
          ) : ( 
          <p className="text-center">No articles found for this topic.</p>
          )}
        </div>
      ) : (
        <div>
          <h1 className="page-title">Topics</h1>
          <ul className="topic-grid">
            {data.map(topic => (
              <li key={topic.slug}>
                <Link to={`/topics/${topic.slug}`} className="topic-card">
                  <h2 className="topic-title">{topic.slug}</h2>
                  <p className="topic-description">{topic.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
};

export default TopicsPage;
