import React from 'react';
import Netflix from '../api/Netflix';
import { Container } from 'semantic-ui-react';

const movie = props => {
  console.log('Here are the props');
  if (props.movie.nfinfo) console.log(props.movie.nfinfo.title);

  return (
    <Container>
      Movie Title
      <br />
    </Container>
  );
};

export default movie;
