import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';
import styles from '../styles/Map.module.css';

const hardcodedPosts = [
  {
    title: 'Sustainable Crafts Fair',
    tags: ['on-campus', 'events'],
    coords: [-71.1702, 42.3352],
    colorClass: 'postColor1',
    time: 'This Saturday, time TBD',
  },
  {
    title: 'Walsh Hall Closet Swap',
    tags: ['thrift', 'events'],
    coords: [-71.165, 42.3379],
    colorClass: 'postColor2',
    time: '4/12 @2pm',
  }
];

export default function MapWithForum() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(hardcodedPosts);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');  // New state for selected tag

  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=zxI0KxtpdcNfhTmR7PEA',
      center: [-71.165, 42.3355],
      zoom: 14,
    });

    mapRef.current = map;
    mapRef.current.markerMap = {};

    map.on('load', () => {
      hardcodedPosts.forEach((post) => {
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
  }, []);

  const handlePostClick = (post) => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.flyTo({ center: post.coords, zoom: 15 });
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }

    const matches = hardcodedPosts.filter(post =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(matches);
  };

  const handleSuggestionClick = (post) => {
    setSearchQuery(post.title);
    setSuggestions([]);

    const markerObj = mapRef.current?.markerMap?.[post.title];
    if (markerObj) {
      const { popup, coords } = markerObj;
      mapRef.current.flyTo({ center: coords, zoom: 15 });
      popup.addTo(mapRef.current);
    }
  };


  const handleTagChange = (e) => {
    const selectedTag = e.target.value;
    setSelectedTag(selectedTag);

    if (selectedTag === '') {
      setFilteredPosts(hardcodedPosts);
    } else {
      const filtered = hardcodedPosts.filter(post =>
        post.tags.includes(selectedTag)
      );
      setFilteredPosts(filtered);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />
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
              <option value="events">Events</option>
              <option value="on-campus">On Campus</option>
              <option value="thrift">Thrift</option>
            </select>
          </div>
          <hr />
          {filteredPosts.map((post, i) => (
            <div
              key={i}
              className={`${styles.postCard} ${styles[post.colorClass]}`}
              onClick={() => handlePostClick(post)}
            >
              <div className={styles.colorBar}></div>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.postTime}>{post.time}</div> 
              <div className={styles.postTags}>
                {post.tags.map((tag, j) => (
                  <span key={j} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
