import React, { useState, useEffect } from 'react';

const InfiniteScroll = ({ fetchData }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreData();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]);

  const loadMoreData = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const newData = await fetchData(page);
      setData((prevData) => [...prevData, ...newData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Render your data here */}
      {data.map((item, index) => (
        <div key={index}>{item}</div>
      ))}

      {/* Loading indicator */}
      {loading && <div>Loading...</div>}
    </div>
  );
};

export default InfiniteScroll;
