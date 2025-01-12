import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/articles/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
      <p className="text-gray-800">{article.content}</p>
      <div className="mt-4">
        <button onClick={() => navigate(`/edit/${id}`)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
      </div>
    </div>
  );
}

export default Article;
