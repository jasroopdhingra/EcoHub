import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx";
import ForumPostCard from "../components/ForumPostCard.jsx";
import styles from '../styles/Forum.module.css';
import initialStore from '../assets/initialStore.json'; 

const NewPost = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.addPost} onClick={() => navigate('/new-post')}>
      <Plus size={16} />
      Add a post
    </div>
  );
};

const Forum = () => {
  const posts = initialStore["forum-posts"];
  const [activeTag, setActiveTag] = useState('');

  const handleTagClick = (tag) => {
    if (activeTag === tag) {
      setActiveTag('');
    } else {
      setActiveTag(tag);
    }
  };

  const filteredPosts = posts.filter(post =>
    activeTag === '' || post.tags.includes(activeTag)
  );

  return (
    <>
      <Navbar />
      <div className={styles.forumContainer}>
        <div className={styles.tagFilters}>
          <span>Filter by tag:</span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('thrift')}
          >
            thrift
          </span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('events')}
          >
            events
          </span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('on-campus')}
          >
            on-campus
          </span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('food')}
          >
            food
          </span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('arts')}
          >
            arts
          </span>
          <span
            className={styles.tag}
            onClick={() => handleTagClick('shop')}
          >
            shop
          </span>
          <NewPost />
        </div>

        <hr className={styles.divider} />

        {filteredPosts.map((post, index) => (
          <ForumPostCard key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default Forum;
