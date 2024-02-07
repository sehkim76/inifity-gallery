import React, { useEffect, useState, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const InfinityScroll = ({ fetchData, scrollableContentRef }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(null);


  const contentRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };


  

  useEffect(() => {
    const scrollableContent = scrollableContentRef.current;
    const content = contentRef.current;

    console.log(`loading[${loading}] page[${page}] `);
    console.log(contentRef);
    //if (!loading && content.clientHeight == 0 ) return;
    if (!loading ) return;

    fetchData(page)
      .then((newData) => {
        if (newData !== null) {
          setImageUrls((prevData) => [...prevData, newData]);
          console.log(`newData[${newData}] imageUrls[${imageUrls.length}]`);
          setHasMore(true);
          setPage((prevPage) => prevPage + 1);


          if (scrollableContent && content) {
            console.log(`content.clientHeight[${content.clientHeight}][${content.scrollHeight}] scrollableContent.scrollTop[${scrollableContent.scrollTop}] scrollableContent.scrollHeight[${scrollableContent.scrollHeight}]`);

            if (content.clientHeight + scrollableContent.scrollTop + 50 > scrollableContent.clientHeight && content.clientHeight != 0) {
              console.log(`SetLoading to false`);
              setLoading(false);
            }
          }
        } else {
          console.log(`newData is null`);
          setHasMore(false);
          console.log(`SetLoading to false`);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error('error fetching data:', error);
        setLoading(false);
      });
  }, [loading, page, hasMore, scrollableContentRef, contentRef, fetchData, imageUrls]);

  useEffect(() => {
    const scrollableContent = scrollableContentRef.current;
    const content = contentRef.current;
  
    if (!scrollableContent || !content) return;
  
    const handleScroll = () => {
      const { clientHeight, scrollTop, scrollHeight } = scrollableContent;
      const contentClientHeight = content.clientHeight;
  
      console.log(`handleScroll() clientHeight[${clientHeight}] contentClientHeight[${contentClientHeight}] scrollTop[${scrollTop}] scrollHeight[${scrollHeight}] loading[${loading}] hasMore[${hasMore}]`);
  
      if (contentClientHeight + scrollTop < scrollHeight - 5 || loading) return;
  
      console.log(`handleScroll() setLoading(true)`);
      setLoading(true);
    };
  
    console.log(`handleScroll() registering`);
    scrollableContent.addEventListener('scroll', handleScroll);
  
    return () => {
      console.log(`handleScroll() deregistering`);
      scrollableContent.removeEventListener('scroll', handleScroll);
    };
  }, [loading, hasMore, scrollableContentRef, contentRef]);
  

  return (
    <div>
      {selectedImage && (
        <div className="modal-overlay">
          <div className="modal">
            <img src={selectedImage} alt="selected" />
            <button onClick={() => setSelectedImage(null)}>닫기</button>
          </div>
        </div>
      )}

        <div className="gallery-grid" ref={contentRef}>
          {imageUrls.map((image, index) => (
            <div key={`selected${index}`}>
              <img
                width="200"
                height="200"
                key={index}
                src={image}
                alt={`Image ${index}`}
                onClick={() => handleImageClick(image)}
              />
            </div>
          ))}
        </div>

        {loading && (
          <div>
          <p>Loading...</p><Spinner animation="border" />
          </div>
          )
        }
        {!hasMore && <p>No more data</p>}

    </div>
  );
};

export default InfinityScroll;
