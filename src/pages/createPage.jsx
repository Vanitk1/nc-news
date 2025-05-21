import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [title, setTitle]       = useState('');
  const [body, setBody]         = useState('');
  const [topic, setTopic]       = useState('');
  const [author, setAuthor]     = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        title,
        body,
        topic,
        author,
        article_img_url: imageUrl || undefined
      };
      const res = await axios.post(
        'https://my-seeding-nc-project.onrender.com/api/articles',
        payload
      );

      navigate(`/articles/${res.data.article.article_id}`);
    } catch (err) {
      console.error(err);
      setError(
        err.response
          ? `Error ${err.response.status}: ${err.response.data.msg || err.response.statusText}`
          : err.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-container">
      <h1 className="page-title">Create a new article</h1>

      <form onSubmit={handleSubmit} className="create-article-form">
        {error && <p className="error-text">{error}</p>}

        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          placeholder="Enter article title"
        />

        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          rows="8"
          value={body}
          onChange={e => setBody(e.target.value)}
          required
          placeholder="Write your article here"
        />

        <label htmlFor="topic">Topic</label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={e => setTopic(e.target.value)}
          required
          placeholder="e.g. cooking, coding"
        />

        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
          placeholder="Your username"
        />

        <label htmlFor="imageUrl">Image URL (optional)</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="https://…"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Posting…' : 'Post article'}
        </button>
      </form>
    </main>
  );
};

export default CreatePage;