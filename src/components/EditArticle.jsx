import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditArticle() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/articles/${id}`, { title, content });
      navigate(`/article/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 drop-shadow-lg">Edit Article</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-white">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border"
          />
        </div>
        <div>
          <label className="text-white">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white">Update</button>
      </form>
    </div>
  );
}

export default EditArticle;