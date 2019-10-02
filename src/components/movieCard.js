import React from 'react';

const MovieCard = props => {
  return (
    <div>
      <img width='200px' src={props.image} />
    </div>
  );
};

export default MovieCard;
