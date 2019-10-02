import React from 'react';
import MovieCard from './movieCard';

const results = props => {
  console.log(props);
  const movies = props.movies.map(movie => {
    return <MovieCard key={movie.title} image={movie.image} />;
  });

  return <div className='container'>{movies}</div>;
};

export default results;
