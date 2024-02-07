import React from 'react'
import ImageGallery from './ImageGallery';
import { useEffect, useState } from 'react';
import './StickyHeader.css'

const StickyHeaderComponent = () => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect( () => {
    console.log('imageUrls', imageUrls);
  }, [imageUrls]);

  useEffect( () => {
    const fetchImageUrls = async () => {
      try {
        for ( let i = 1; i < 30; i++ )
        {
          const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${i}`)
          const data = await response.json();
          if ( data !== undefined && data !== null )
          {
            setImageUrls((prevUrl) => [ ...prevUrl, data.url ])
          }
        }
      } catch ( error ) {
        console.error('error fetching image url');
      }
    }
    fetchImageUrls();
  }, []);
  return (
    <div className="sticky-container">
      <header className="sticky-header">
        <h1>리액트그램</h1>
      </header>        
      <div className="scrollable-content">
        <ImageGallery imageUrls={imageUrls}/>
      </div>
    </div>
  )
}

export default StickyHeaderComponent