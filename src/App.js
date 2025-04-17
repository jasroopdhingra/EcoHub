import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Scale from './pages/Scale';
import Map from './pages/Map';
import Forum from './pages/Forum';
import NewPost from './pages/NewPost';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/scale" element={<Scale />} />
      <Route path="/map" element={<Map />} />
      <Route path="/forum" element={<Forum />} />
      <Route path="/new-post" element={<NewPost />} />
    </Routes>
    );
}
export default App;
