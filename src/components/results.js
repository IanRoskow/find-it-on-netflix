import React from 'react';
import { Image } from 'semantic-ui-react';

const results = props => {
  const images = props.movies.map(movie => {
    return <Image src={movie.image} rounded floated='left' />;
  });

  return <Image.Group size='small'>{images}</Image.Group>;
};

export default results;
