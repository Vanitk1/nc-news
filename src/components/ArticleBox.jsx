import React from "react"
import { Link } from "react-router-dom"

const ArticleBox = ({ article }) => {
    return(
    <article className="article-container">
        <Link to={`/articles/${article.article_id}`} className="link">
        {article.article_img_url && (
            <img
            src={article.article_img_url}
            alt={article.title}
            className="img-container"
            />
        )}
        <div className="card-content">
        <h2 className="card-title">{article.title}</h2>
        <p className="card-snippet">by {article.author} in <em>{article.topic}</em></p>
        </div>
        </Link>

        <div className="article-footer">
            <button>
                <Link to={`/articles/${article.article_id}#comments`} className="comment-link">
                {article.comment_count} comments
                </Link>
            </button>
        </div>
    </article>
    )
}

export default ArticleBox