import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import styles from '../styles/Forum.module.css';
import { useNavigate } from 'react-router-dom';

export default function ForumPostCard({ post, onFindOnMap }) {
  const repliesCount = post.replies ? post.replies.length : 0;
  const navigate = useNavigate();
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = (e) => {
    e.preventDefault();
    setShowReplies((prev) => !prev);
  };

  
    const handleFindOnMap = () => {
      navigate('/map', { state: { selectedPost: post } });
    };

  return (
    <div className={styles.postCard}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDesc}>{post.description}</p>
      
      <div className={styles.postFooter}>
        <div className={styles.infoRow}>
          <button
            type="button"
            className={styles.link}
            onClick={handleFindOnMap}
          >
            <MapPin size={14} />
            Find on map
          </button>

          <div className={styles.postTags}>
            {post.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {repliesCount > 0 && (
          <button
            type="button"
            className={styles.repliesButton}
            onClick={toggleReplies}
          >
            {showReplies ? "Hide replies ↑" : `${repliesCount} replies ↓`}
          </button>
        )}
      </div>
      
      {showReplies && (
        <div className={styles.replyContainer}>
          {post.replies.map((reply, idx) => (
            <div key={idx} className={styles.replyCard}>
              <p>{reply.text}</p>
            </div>
          ))}
        </div>
      )}
      <hr className={styles.divider} />
    </div>
  );
}
