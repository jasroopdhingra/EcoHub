import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import styles from '../styles/Forum.module.css';

export default function ForumPostCard({ post }) {
  const repliesCount = post.replies ? post.replies.length : 0;
  const [showReplies, setShowReplies] = useState(false);

  const toggleReplies = (e) => {
    e.preventDefault();
    setShowReplies((prev) => !prev);
  };

  return (
    <div className={styles.postCard}>
      <h2 className={styles.postTitle}>{post.title}</h2>
      <p className={styles.postDesc}>{post.description}</p>
      <div className={styles.postFooter}>
        <a href="#" className={styles.link}>
          <MapPin size={14} />
          Find on map
        </a>
        <div className={styles.postTags}>
          {post.tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {repliesCount > 0 && (
          <a href="#" className={styles.repliesButton} onClick={toggleReplies}>
            {showReplies ? "Hide replies ↑" : `${repliesCount} replies ↓`}
          </a>
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
