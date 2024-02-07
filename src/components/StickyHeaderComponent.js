import React, { useRef } from 'react'
import ImageGallery from './ImageGallery';
import { useEffect, useState } from 'react';
import './StickyHeader.css'
import InfinityScrollComponent from './InfinityScrollComponent';

const StickyHeaderComponent = () => {
  const scrollableContentRef = useRef(null);
  return (
    <div className="sticky-container">
      <header className="sticky-header">
        <h1>리액트그램</h1>
      </header>        
      <div className="scrollable-content" ref={scrollableContentRef}>
        <InfinityScrollComponent scrollableContentRef={scrollableContentRef}/>
        { /* }
        <ImageGallery imageUrls={imageUrls}/>
        { */ }
      </div>
    </div>
  )
}

export default StickyHeaderComponent