import React, { useEffect, useState, useRef } from 'react';

const InfinityScroll = ({ fetchData }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedImage, setSelectedImage] = useState(null);

  const scrollableContentRef = useRef(null);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleScroll = () => {
    const scrollableContent = scrollableContentRef.current;
    if (!scrollableContent) return;

    const { clientHeight, scrollTop, scrollHeight } = scrollableContent;

    console.log(`handleScroll() clientHeight[${clientHeight}] scrollTop[${scrollTop}] scrollHeight[${scrollHeight}] loading[${loading}] hasMore[${hasMore}]`);

    if (clientHeight + scrollTop < scrollHeight - 5 || loading) return;

    console.log(`handleScroll() setLoading(true)`);
    setLoading(true);
  };

  useEffect(() => {
    console.log(`loading[${loading}] page[${page}]`);
    if (!loading) return;

    fetchData(page)
      .then((newData) => {
        if (newData !== null) {
          setImageUrls((prevData) => [...prevData, newData]);
          console.log(`newData[${newData}] imageUrls[${imageUrls.length}]`);
          setHasMore(true);
          setPage((prevPage) => prevPage + 1);

          const scrollableContent = scrollableContentRef.current;
          if (scrollableContent) {
            console.log(`scrollableContent.clientHeight[${scrollableContent.clientHeight}] scrollableContent.scrollTop[${scrollableContent.scrollTop}] scrollableContent.scrollHeight[${scrollableContent.scrollHeight}]`);

            if (scrollableContent.clientHeight + scrollableContent.scrollTop <= scrollableContent.scrollHeight + 5) {
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
  }, [loading, page, fetchData, imageUrls]);

  useEffect(() => {
    console.log(`handleScroll() registering`);
    const scrollableContent = scrollableContentRef.current;
    if (scrollableContent) {
      scrollableContent.addEventListener('scroll', handleScroll);
    }

    return () => {
      console.log(`handleScroll() deregistering`);
      if (scrollableContent) {
        scrollableContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

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
      <div className="scrollable-content" ref={scrollableContentRef}>
        <div className="gallery-grid">
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

        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more data</p>}
      </div>
    </div>
  );
};

export default InfinityScroll;
