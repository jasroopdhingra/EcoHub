import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import ForumPostCard from '../components/ForumPostCard.jsx';
import styles from '../styles/Forum.module.css';
import initialStore from '../assets/initialStore.json';

// Button to navigate to New Post page
function AddPostButton() {
  const navigate = useNavigate();
  return (
    <div className={styles.addPost} onClick={() => navigate('/new-post')}>
      <Plus size={16} />
      Add a post
    </div>
  );
}

export default function Forum({ posts = [] }) {
  const [activeTag, setActiveTag] = useState('');
  const initialPosts = initialStore['forum-posts'];

  // Combine initial posts with any dynamically passed-in posts
  const allPosts = [...initialPosts, ...posts];

  const handleTagClick = (tag) => {
    setActiveTag((prev) => (prev === tag ? '' : tag));
  };

  const filteredPosts = allPosts.filter((post) =>
    activeTag === '' || post.tags.includes(activeTag)
  );

  const tagList = ['thrift', 'events', 'on-campus', 'food', 'arts', 'shop'];

  return (
    <>
      <Navbar />
      <div className={styles.forumContainer}>
        <div className={styles.tagFilters}>
          <span>Filter by tag:</span>
          {tagList.map((tag) => (
            <span
              key={tag}
              className={styles.tag}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </span>
          ))}
          <AddPostButton />
        </div>

        <hr className={styles.divider} />

        {filteredPosts.map((post, index) => (
          <ForumPostCard key={index} post={post} />
        ))}
      </div>
    </>
  );
}
