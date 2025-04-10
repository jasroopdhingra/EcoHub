import React from 'react';
import { Plus, MapPin } from 'lucide-react';
import styles from '../styles/Forum.module.css';
import { useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar.jsx"; 
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
  const posts = [
    {
      id: 1,
      title: 'Sustainable Crafts Fair!!!!',
      description:
        'I heard about an event happening in the quad this Saturday! Students were invited to sell their sustainably-produced crafts. I’m not sure of the time though, can anyone verify?',
      tags: ['on-campus', 'events'],
      replies: 2,
    },
    {
      id: 2,
      title: 'Walsh Hall Closet Swap',
      description:
        'My roommate and I are organizing a girls’ closet swap for anyone looking to get rid of old clothes and find new ones! In the Floor 3 lounge :) 4/12 @2pm',
      tags: ['on-campus', 'thrift'],
      replies: 0,
    },
  ];

  return (
    <>
      <div>
      <Navbar />
      </div>

      <div className={styles.forumContainer}>
        <div className={styles.tagFilters}>
          <span>Filter by tag:</span>
          <span className={styles.tag}>thrift</span>
          <span className={styles.tag}>events</span>
          <span className={styles.tag}>on-campus</span>
          <NewPost />
        </div>

        <hr className={styles.divider} />

        {posts.map((post) => (
          <div key={post.id} className={styles.postCard}>
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
              {post.replies > 0 && (
                <a href="#" className={styles.repliesButton}>
                  {post.replies} replies ↓
                </a>
              )}
            </div>
            <hr className={styles.divider} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Forum;
