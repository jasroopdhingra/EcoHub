import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Scale from './pages/Scale';
import Map from './pages/Map';
import Forum from './pages/Forum';
import NewPost from './pages/NewPost';
import initialStore from './assets/initialStore.json';

function App() {
  const [posts, setPosts] = useState(initialStore['forum-posts'] || []);

  const addPost = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scale" element={<Scale />} />
      <Route path="/map" element={<Map posts={posts} />} />
      <Route path="/forum" element={<Forum posts={posts} />} />
      <Route path="/new-post" element={<NewPost addPost={addPost} />} />
    </Routes>
    );
}
export default App;
