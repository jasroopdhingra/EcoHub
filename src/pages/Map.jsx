import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Navbar from '../components/Navbar';
import styles from '../styles/Map.module.css';

const hardcodedPosts = [
    {
      title: 'Sustainable Crafts Fair',
      tags: ['on-campus', 'events'],
      coords: [-71.171, 42.3355],
      colorClass: 'postColor1',
    },
    {
      title: 'Walsh Hall Closet Swap',
      tags: ['thrift', 'events'],
      coords: [-71.165, 42.3379],
      colorClass: 'postColor2',
    }
  ];

export default function MapWithForum() {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=zxI0KxtpdcNfhTmR7PEA',
      center: [-71.165, 42.3355],
      zoom: 14,
    });
  
    mapRef.current = map;
  
    map.on('load', () => {
      
      hardcodedPosts.forEach((post) => {
        const markerEl = document.createElement('div');
        
        let markerColor;
        if (post.colorClass === 'postColor1') {
          markerColor = '#27ae60';
        } else if (post.colorClass === 'postColor2') {
          markerColor = '#2980b9'; 
        }
  
        markerEl.style.backgroundColor = markerColor;
        markerEl.style.width = '24px'; 
        markerEl.style.height = '24px';
        markerEl.style.borderRadius = '50%'; 
        markerEl.style.border = '2px solid white'; 
        markerEl.style.boxShadow = '0 0 3px rgba(0,0,0,0.5)'; 
  

        new maplibregl.Marker({ element: markerEl })
            .setLngLat(post.coords)
            .setPopup(new maplibregl.Popup().setHTML(`<h3>${post.title}</h3><p>Event at Boston College</p>`))
            .addTo(map)
      });
  
      setMapLoaded(true);
    });
  
    return () => {
      map.remove();
    };
  }, []);
  

  const handlePostClick = (post) => {
    if (!mapRef.current || !mapLoaded) return;
    mapRef.current.flyTo({ center: post.coords, zoom: 15 });
  };

  const handleSearch = () => {
    if (searchQuery.trim() === '') return;


    const apiKey = 'zxI0KxtpdcNfhTmR7PEA';
    fetch(`https://api.maptiler.com/geocoding/${searchQuery}.json?key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          const location = data.features[0].geometry.coordinates;
          if (mapRef.current) {
            mapRef.current.flyTo({
              center: location,
              zoom: 14,
            });
          }
        } else {
          alert('Location not found');
        }
      })
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      <div className={styles.mainContent}>
        <div className={styles.leftPanel}>
          <div className={styles.searchBar}>
            <span className={styles.searchLabel}>Events near:</span>
            <input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
          <div ref={mapContainerRef} className={styles.map}></div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.tagFilters}>
            <span>Filter by tag:</span>
            <span className={styles.tag}>events</span>
            <span className={styles.tag}>on-campus</span>
            <span className={styles.tag}>thrift</span>
          </div>
          <hr />
          {hardcodedPosts.map((post, i) => (
  <div key={i} className={`${styles.postCard} ${styles[post.colorClass]}`} onClick={() => handlePostClick(post)}>
    <div className={styles.colorBar}></div>
    <div className={styles.postTitle}>{post.title}</div>
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
