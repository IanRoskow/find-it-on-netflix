import React from 'react';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Segment, Image, Icon } from 'semantic-ui-react';

import CustomCardSlide from './CustomCardSlide';
import CustomDotGroup from './CustomDotGroup';

const results = props => {
  let count = 0;
  const slides = props.movies.map(movie => {
    count++;
    return (
      <CustomCardSlide
        image={movie.image}
        index={0}
        header={movie.title}
        meta={
          <Icon
            link
            onClick={() => props.movieDetails(movie.netflixid)}
            name='angle down'
          />
        }
      />
    );
  });
  //<Image src={movie.image} rounded floated='left' />
  //<Image.Group size='small'>{images}</Image.Group>
  return (
    <Segment>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.75}
        totalSlides={count}
        visibleSlides={5}
        style={{ width: '100%' }}
      >
        <Slider>{slides}</Slider>
        <CustomDotGroup slides={count} />
      </CarouselProvider>
    </Segment>
  );
};

export default results;
