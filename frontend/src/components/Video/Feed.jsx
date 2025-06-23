import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import './VideoFeed.css';
import { Link } from 'react-router-dom';

const Feed= () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { currentUser, logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        setVideos(response.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch videos');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  if (loading) return <div className="loading">Loading videos...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="video-feed-container">
      <div className="feed-header">
        <h2>Video Feed</h2>
        <Link to="/upload" className="upload-button">
          Upload Video
        </Link>
        {currentUser && (
          <div className="user-controls">
            <span className="welcome-message">Welcome, {currentUser.name}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
      
      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <div className="videos-grid">
          {videos.map(video => (
            <div key={video._id} className="video-card">
              
              <video controls width="100%">
                <source src={video.videoUrl} type="video/mp4" />
                Your browser doesn't support videos.
              </video>
              <h3>{video.title}</h3>
              <p>Uploaded by: {video.uploaderName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;