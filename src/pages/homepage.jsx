import { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleBox from "../components/ArticleBox"


const HomePage = () => {
    const [articles, setArticles] = useState([]);
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

    return (
        <main className='homepage-container'>
            <h1 id="article-header" className='hidden'>All articles</h1>

            {loading && <p className='loading-article-text'>Loading articles</p>}
            {error && <p className='error-article-text'>{error}</p>}
            
            {!loading && !error && (
                <section className="articles-heading">
                    {articles.length > 0 ? (
                        <ul className="article-grid">
                            {articles.map(article => (
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