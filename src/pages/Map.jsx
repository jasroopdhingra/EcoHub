import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';
import styles from '../styles/Map.module.css';


export default function MapWithForum({ posts = [] }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const allPosts = posts;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');
  console.log("Posts:", allPosts)
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=zxI0KxtpdcNfhTmR7PEA',
      center: [-71.165, 42.3355],
      zoom: 14,
    },[]);

    mapRef.current = map;
    mapRef.current.markerMap = {};

    map.on('load', () => {
      allPosts.forEach((post) => {
        const markerEl = document.createElement('div');
        markerEl.className = `${styles.marker} ${styles[post.colorClass]}`;

        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(`
          <h3>${post.title}</h3>
          <p>${post.time}</p>
        `);

        const marker = new maplibregl.Marker({ element: markerEl })
          .setLngLat(post.coords)
          .setPopup(popup)
          .addTo(map);

        mapRef.current.markerMap[post.title] = { marker, popup, coords: post.coords };
      });

      setMapLoaded(true);
    });

    return () => map.remove();
  }, [allPosts]);

  const handlePostClick = (post) => {
    if (!mapRef.current || !mapLoaded) return;
  
    const markerObj = mapRef.current.markerMap[post.title];
    if (markerObj) {
      const { marker, coords } = markerObj;
      mapRef.current.flyTo({ center: coords, zoom: 15 });
      marker.togglePopup();
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matches = allPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (post) => {
    setSearchQuery(post.title);
    setSuggestions([]);

    const markerObj = mapRef.current?.markerMap?.[post.title];
    if (markerObj) {
      const { marker, coords } = markerObj;
      mapRef.current.flyTo({ center: coords, zoom: 15 });
      marker.togglePopup();
    }
  };

  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setSelectedTag(selectedTag);

    if (selectedTag === '') {
      setFilteredPosts(allPosts);
    } else {
      const filtered = allPosts.filter(post =>
        post.tags.includes(selectedTag)
      );
      setFilteredPosts(filtered);
    }
  };

  const allTags = Array.from(
    new Set(allPosts.flatMap(post => post.tags))
  );

  return (
    <main>
      <Navbar />
    <div className={styles.pageContainer}>

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.searchBarWrapper}>
            <div className={styles.searchBar}>
              <span className={styles.searchLabel}>Search Events:</span>
              <input
                type="text"
                placeholder="Event name"
                value={searchQuery}
                onChange={handleInputChange}
                className={styles.searchInput}
              />
            </div>
            {suggestions.length > 0 && (
              <ul className={styles.suggestionList}>
                {suggestions.map((post, i) => (
                  <li
                    key={i}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(post)}
                  >
                    {post.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div ref={mapContainerRef} className={styles.map}></div>
        </div>

        <div className={styles.rightPanel}>
        <div className={styles.tagFilters}>
            <span>Filter by tag:</span>
            <select value={selectedTag} onChange={handleTagChange} className={styles.tagSelect}>
              <option value="">All</option>
              {allTags.map((tag, i) => (
                <option key={i} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <hr />
          {filteredPosts.map((post, i) => (
            <div
              key={i}
              className={`${styles.postCard}`}
              onClick={() => handlePostClick(post)}
            >
              <div className={`${styles.colorBar} ${styles[post.colorClass]}`}></div>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postTime}>{post.time}</div>
              <div className={styles.postTags}>
                {post.tags.map((tag, j) => (
                  <span key={j} className={`${styles.tag} ${styles[post.colorClass]}`}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </main>
  );
}
