import React from 'react'
import InfinityScroll from './InfinityScroll';

const InfinityScrollComponent = ({scrollableContentRef}) => {
    const fetchData = async (page) => {
        console.log(`fetching data page[${page}]`)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${page}`)
            const newData = await response.json();
            console.log("data", newData.url);
            return newData.url;
        } catch ( error) {
            console.error("data is null");
            //return null;

            throw new Error('Error fetching data');
        }
        return null;
    };

  return (
    <div>
        <InfinityScroll fetchData={fetchData} scrollableContentRef={scrollableContentRef} />
    </div>
  )
}

export default InfinityScrollComponent;