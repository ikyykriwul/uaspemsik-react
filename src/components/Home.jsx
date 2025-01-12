import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import mountMerapiImage from '../assets/merapi2.jpg'; 
import mountKrakatauImage from '../assets/krakatau.jpg'; 
import mountKeludImage from '../assets/kelud.jpg'; 
import axios from 'axios';

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <header className="py-4 border-b bg-gradient-to-r from-155E95 to-F6C794 shadow-lg">
        <nav className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">Volcano Disaster Information</h1>
          <ul className="flex space-x-4">
            <li><Link to="/" className="text-white font-semibold hover:text-gray-200">Home</Link></li>
            <li><Link to="/info" className="text-white font-semibold hover:text-gray-200">Other Information</Link></li>
            <li><Link to="/contact" className="text-white font-semibold hover:text-gray-200">Contact</Link></li>
          </ul>
        </nav>
      </header>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-center">
          <img src={mountMerapiImage} alt="Mount Merapi" className="mx-auto rounded shadow w-full h-64 object-cover" />
          <h2 className="text-2xl font-bold text-blue-700 mt-4">Mount Merapi</h2>
          <p className="text-gray-700">Location: Central Java, Indonesia</p>
          <p className="text-gray-700">Last Eruption: March 2021</p>
        </div>
        <div className="text-center">
          <img src={mountKrakatauImage} alt="Mount Krakatau" className="mx-auto rounded shadow w-full h-64 object-cover" />
          <h2 className="text-2xl font-bold text-blue-700 mt-4">Mount Krakatau</h2>
          <p className="text-gray-700">Location: Sunda Strait, Indonesia</p>
          <p className="text-gray-700">Last Eruption: December 2018</p>
        </div>
        <div className="text-center">
          <img src={mountKeludImage} alt="Mount Kelud" className="mx-auto rounded shadow w-full h-64 object-cover" />
          <h2 className="text-2xl font-bold text-blue-700 mt-4">Mount Kelud</h2>
          <p className="text-gray-700">Location: East Java, Indonesia</p>
          <p className="text-gray-700">Last Eruption: February 2014</p>
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link to="/create" className="bg-gradient-to-r from-155E95 to-F6C794 text-white px-4 py-2 rounded hover:from-6A80B9 hover:to-FFF6B3">
          Create New Article
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map(article => (
          <div key={article.id} className="border p-4 bg-white rounded shadow text-center">
            <h2 className="text-2xl font-bold text-gray-800">{article.title}</h2>
            <p className="text-gray-600">{article.content.substring(0, 600)}...</p>
            <Link to={`/article/${article.id}`} className="text-blue-500">Read more</Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-bold text-blue-700">Location of Mount Merapi</h2>
        <div className="w-full h-96">
          <iframe
            title="Mount Merapi Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.928234014217!2d110.4428133147776!3d-7.540722994556295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5f7f4b0b0b0b%3A0x401e8f1fc28c7e0!2sMount%20Merapi!5e0!3m2!1sen!2sid!4v1634567890123!5m2!1sen!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <footer className="mt-8 py-4 bg-blue-700 text-white text-center border-t">
        <p>&copy; 2025 Volcano Disaster Information. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;