import React from 'react';
import LazyLoad from 'react-lazy-load';

const LazyImage = props => {
  return (
    <LazyLoad
      width={150}
      debounce={false}
      offsetVertical={0}
      offsetHorizontal={700}
    >
      {props.image}
    </LazyLoad>
  );
};

export default LazyImage;
