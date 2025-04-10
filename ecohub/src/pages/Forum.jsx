import React from 'react';
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

  return (
    <>
      <Navbar />
      <div className={styles.forumContainer}>
        <div className={styles.tagFilters}>
          <span>Filter by tag:</span>
          <span className={styles.tag}>thrift</span>
          <span className={styles.tag}>events</span>
          <span className={styles.tag}>on-campus</span>
          <NewPost />
        </div>

        <hr className={styles.divider} />

        {posts.map((post, index) => (
          <ForumPostCard key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default Forum;
