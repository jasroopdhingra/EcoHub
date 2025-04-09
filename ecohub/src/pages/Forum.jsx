import React from 'react';
import { Plus, MapPin } from 'lucide-react';
import styles from '../styles/Forum.module.css';
import Navbar from "./Navbar.jsx"; 




const Forum = () => {
  const posts = [
    {
      title: 'Sustainable Crafts Fair!!!!',
      description:
        'I heard about an event happening in the quad this Saturday! Students were invited to sell their sustainably-produced crafts. I’m not sure of the time though, can anyone verify?',
      tags: ['on-campus', 'events'],
      replies: 2,
    },
    {
      title: 'Walsh Hall Closet Swap',
      description:
        'My roommate and I are organizing a girls’ closet swap for anyone looking to get rid of old clothes and find new ones! In the Floor 3 lounge :) 4/12 @2pm',
      tags: ['on-campus', 'thrift'],
      replies: 0,
    },
  ];

  return (
    <>
    <Navbar />
     {/* <div className={styles.heroSection}>
        <h1 className={styles.heroTitle}>The Forum</h1>
        <p className={styles.heroSubtitle}>Got something to share?</p>
      </div>*/}

      <div className={styles.forumPage}>
        <div className={styles.filterBar}>
          <span>Filter by tag:</span>
          <span className={styles.filterButton}>thrift</span>
          <span className={styles.filterButton}>events</span>
          <span className={styles.filterButton}>on-campus</span>
          <div className={styles.addPost}>
            <Plus size={16} /> Add a post
          </div>
        </div>

        <hr className={styles.divider} />

        {posts.map((post, index) => (
          <div key={index} className={styles.postCard}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <p>{post.description}</p>
            <div className={styles.postFooter}>
              <a href="#" className={styles.link}>
                <MapPin size={14} /> Find on map
              </a>
              <div className={styles.postTags}>
                {post.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              {post.replies > 0 && (
                <a href="#" className={styles.replyLink}>
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
