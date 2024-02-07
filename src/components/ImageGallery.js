import React, { useState } from 'react'
import '../App.css';

const ImageGallery = ({imageUrls}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  console.log('ImageGallery', imageUrls);
  return (
    <div>
    {selectedImage && (
      <div className='modal-overlay'>
        <div className='modal'>
          <img src={selectedImage} alt='selected'/>
          <button onClick={()=> setSelectedImage(null)}>닫기</button>
        </div>
      </div>      
    )}

    </div>
  )
}

export default ImageGallery