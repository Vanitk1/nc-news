import { useEffect, useState, useMemo } from 'react';
import React from 'react';
import axios from 'axios';
import ArticleBox from "../components/ArticleBox"


const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState("asc");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://my-seeding-nc-project.onrender.com/api/articles')
        .then(res => {
            
        if (Array.isArray(res.data.articles)) {
          setArticles(res.data.articles);
        } else {
          throw new Error('Unexpected response');
        }
      })
      .catch(err => {
        setError(err.response ? `Error ${err.response.status}` : err.message);
      })
      .finally(() => setLoading(false));
    }, []);
    
    const sortedArticles = useMemo(() => {
    const copy = [...articles];
    return copy.sort((a, b) => {
      let diff;
      if (sortBy === 'created_at') {
        diff = new Date(a.created_at) - new Date(b.created_at);
      } else {
        diff = a[sortBy] - b[sortBy];
      }
      return order === 'desc' ? diff : -diff;
    });
  }, [articles, sortBy, order]);


    return (
        <main className='homepage-container'>
            <h1 className='article-header'>All articles</h1>
            <h3 className='article-header'>Click on any article to read!</h3>
            <div className='sort-form'>
                <label>
                    <select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value)}>
                        <option value="created_at">Date</option>
                        <option value="comment_count">Comment count</option>
                        <option value="votes">Votes</option>
                    </select>
                </label>
                <button type='button'
                onClick={() => setOrder(date => (date === "asc" ? "desc": "asc"))}>
                    {order === 'asc' ? 'Descending' : 'Ascending' }
                </button>
            </div>

            {loading && <p className='loading-article-text'>Loading articles</p>}
            {error && <p className='error-article-text'>{error}</p>}
            
            {!loading && !error && (
                <section className="articles-heading">
                    {sortedArticles.length > 0 ? (
                        <ul className="article-grid">
                            {sortedArticles.map(article => (
                                <li key={article.article_id}>
                                    <ArticleBox article={article} />
                                </li>
                            ))}
                        </ul>
                        ) : (
                        <p className="text-center">No articles available.</p>
                        )}
                </section>
            )}
        </main>
    )
}

export default HomePage