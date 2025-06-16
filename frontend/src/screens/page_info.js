import NavBar from "../components/navbar";
import { useLocation } from "react-router-dom";
import Para from "../components/para";
import { motion } from "framer-motion";
import "../static/theme.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Comment from "../components/comment";
import Header from "../components/navbarcomponent/header";
import { FaHeart, FaDownload, FaRegHeart, FaReply } from 'react-icons/fa';

function Page_info() {
  const location = useLocation();
  const { data } = location.state || {};
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [downloadCount, setDownloadCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch initial template details including likes and downloads
  useEffect(() => {
    if (data?.id) {
      fetchTemplateDetails();
    } else {
      setLoading(false);
    }
  }, [data?.id]);

  const fetchTemplateDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/template/${data.id}`);
      console.log(response.data);
      setLikeCount(response.data.likes || 0);
      setDownloadCount(response.data.downloads || 0);
    } catch (error) {
      console.error("Error fetching template details:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handler() {
    try {
      const data1 = { name: data.name };
      const response = await axios.post("http://localhost:5000/livepage", data1);
      const { url } = response.data;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error in handler:", error);
    }
  }

  async function downloadHandler() {
    try {
      setIsDownloading(true);
      setProgress(0);
      
      // First update the download count in database
      if (data?.id) {
        const countResponse = await axios.post("http://localhost:5000/api/template/download", {
          id: data.id
        });
        setDownloadCount(countResponse.data.downloads);
      }

      // Then process the actual download
      const data1 = { name: data.name, id: data.id };
      const response = await axios.post("http://localhost:5000/download", data1, {
        responseType: "blob",
        onDownloadProgress: (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            setProgress(percentage);
          }
        },
      });
      
      const blob = new Blob([response.data], { type: "application/zip" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = url;
      link.download = `${data1.name}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error in downloading:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  async function handleLike() {
    if (!data?.id) return;
    
    try {
      const action = liked ? 'unlike' : 'like';
      const response = await axios.post("http://localhost:5000/api/template/like", {
        id: data.id,
        action: action
      });
      
      setLikeCount(response.data.likes);
      setLiked(!liked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  }

  function handleCommentSubmit() {
    if (commentText.trim()) {
      // Here you would typically send the comment to your backend
      // and then update the comments list
      console.log("Submitting comment:", commentText);
      setCommentText("");
    }
  }

  // Simulated comments for demonstration
  const mockComments = [
    {
      id: 1,
      username: "Sarah Johnson",
      timeAgo: "2 days ago",
      content: "This button component is exactly what I needed for my project! The hover effect is really smooth.",
      likes: 12,
      avatar: "https://via.placeholder.com/40"
    },
    {
      id: 2,
      username: "Mike Chen",
      timeAgo: "1 day ago",
      content: "I agree! I've been using it in my dashboard and it works great.",
      likes: 3,
      avatar: "https://via.placeholder.com/40",
      isReply: true,
      replyTo: 1
    },
    {
      id: 3,
      username: "Alex Rodriguez",
      timeAgo: "3 days ago",
      content: "Would be nice to have a disabled state option as well. Otherwise, it's perfect!",
      likes: 8,
      avatar: "https://via.placeholder.com/40"
    }
  ];

  if (loading) {
    return <div className="loading">Loading template details...</div>;
  }

  return (
    <div className="page-info-container">
      <Header />
      <div className="content-wrapper">
        <div className="info-section">
          <Para
            text={data?.name || "Project Name"}
            style1={{ fontSize: 30, paddingBottom: 40, color: "#ffffff" }}
          />
          <motion.div className="image-container" whileHover="hover" initial="initial">
            <motion.img
              variants={{ hover: { filter: "brightness(50%)" } }}
              className="preview-image"
              src={data?.url || "https://via.placeholder.com/700x600"}
              alt="Preview"
            />
            <motion.div
              className="overlay-button"
              variants={{ hover: { opacity: 1 } }}
              onClick={downloadHandler}
            >
              Download
            </motion.div>
          </motion.div>
          
          <div className="stats-container">
            <div className="stat-item">
              <FaHeart className="stat-icon" />
              <span>{likeCount}</span>
            </div>
            <div className="stat-item">
              <FaDownload className="stat-icon" />
              <span>{downloadCount}</span>
            </div>
          </div>
          
          <div className="button-group">
            <motion.div
              className="action-button live-demo"
              onClick={handler}
              whileHover={{ scale: 1.05 }}
            >
              Live Demo
            </motion.div>
            <motion.div
              className={`action-button download ${isDownloading ? "disabled" : ""}`}
              onClick={downloadHandler}
              whileHover={{ scale: isDownloading ? 1 : 1.05 }}
            >
              {isDownloading ? `Downloading ${Math.round(progress)}%` : "Download"}
            </motion.div>
            <motion.div
              className={`action-button like ${liked ? "liked" : ""}`}
              onClick={handleLike}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {liked ? <FaHeart className="like-icon" /> : <FaRegHeart className="like-icon" />}
              {liked ? "Liked" : "Like"}
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        <div className="comment-input-container">
          <textarea
            className="comment-input"
            placeholder="Add a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button 
            className="post-comment-button"
            onClick={handleCommentSubmit}
          >
            Post Comment
          </button>
        </div>
        
        <div className="comment-list">
          {mockComments.map(comment => (
            <div key={comment.id} className={`comment-item ${comment.isReply ? 'comment-reply' : ''}`}>
              <img src={comment.avatar} alt={comment.username} className="comment-avatar" />
              <div className="comment-content">
                <div className="comment-header">
                  <span className="username">{comment.username}</span>
                  <span className="timestamp">{comment.timeAgo}</span>
                </div>
                <p className="comment-text">{comment.content}</p>
                <div className="comment-actions">
                  <button className="action-like">
                    <FaHeart className="action-icon" /> {comment.likes}
                  </button>
                  <button className="action-reply">
                    <FaReply className="action-icon" /> Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page_info;