import React, { useState, useEffect } from 'react';
import InfiniteScroll from './InfiniteScroll';

const MyInfiniteScrollComponent = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    try {
        console.log(`fetchData() ${page}`);
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  };

  const loadMoreData = async () => {
    const newData = await fetchData();
    setItems((prevItems) => [...prevItems, ...newData]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div>
    
      <InfiniteScroll
        dataLength={items.length}
        next={loadMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: 'center' }}>Yay! You have seen it all</p>}
      >
        {items.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <hr />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MyInfiniteScrollComponent;
