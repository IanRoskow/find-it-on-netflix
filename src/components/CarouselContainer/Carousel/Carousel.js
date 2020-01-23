import React, { useState } from 'react';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Placeholder } from 'semantic-ui-react';
import CarouselSlide from '../../CarouselSlide/CarouselSlide';

import './Carousel.css';

const Carousel = ({
  movieList,
  selectMovie,
  isLoadingMovies,
  visibleSlides
}) => {
  const [buttonVisible, setButtonVisible] = useState(true);

  //Loads all of the images when the user clicks next arrow
  //This delays all images from being loaded at once and causing issues
  const lazyLoad = () => {
    let components = document.querySelectorAll(
      '.carousel__slider-tray-wrapper li'
    );
    setButtonVisible(false);
    components.forEach(el => {
      let image = el.querySelector('img');
      if (!image.src) {
        image.src = image.getAttribute('data-src');
      }
    });
  };

  //Map the movie titles to an array of card slides
  let count = 0;
  const slides = movieList.map(movie => {
    count++;
    let image = movie.largeimage.length ? movie.largeimage : movie.image;
    let imageAttribute = count < visibleSlides * 3 ? 'src' : 'data-src';
    let variableAttribute = { [imageAttribute]: image };
    //may need to refactor for mobile, when slide count is one
    let first = count % visibleSlides === 1 ? 'first-slide' : '';
    let last = count % visibleSlides === 0 ? 'last-slide' : '';
    return (
      <CarouselSlide
        key={count}
        image={
          <img {...variableAttribute} className='carouselImage' alt='Error' />
        }
        index={count}
        classToAdd={first + last}
        callBack={() => selectMovie(movie.netflixid)}
      />
    );
  });

  //If it is loading then this creates a loading slider
  if (isLoadingMovies) {
    for (let i = 1; i <= visibleSlides; i++) {
      count++;
      slides.push(
        <CarouselSlide
          key={count}
          image={
            <Placeholder inverted style={{ height: 200, width: 150 }}>
              <Placeholder.Image />
            </Placeholder>
          }
          index={count}
          classToAdd={''}
          callBack={() => {}}
        />
      );
    }
  }

  //Add extra blank slides to ensure it first and last slides in the carousel stay consistent
  let needExtra = count % visibleSlides;
  let extraSlides = needExtra ? visibleSlides - needExtra : 0;
  for (let i = 1; i <= extraSlides; i++) {
    count++;
    slides.push(
      <CarouselSlide
        key={count}
        image={<img data-src='' className='ui small' width='150px' alt='' />}
        index={count}
        classToAdd={''}
        callBack={() => {}}
      />
    );
  }

  //Create the left and right buttons for the carousel
  let buttons =
    count === 0 ? null : (
      <React.Fragment>
        <ButtonBack
          disabled={buttonVisible}
          children={
            <img src={require('../../../assets/images/Arrow.svg')} alt='<' />
          }
        />
        <ButtonNext
          onClick={lazyLoad}
          children={
            <img src={require('../../../assets/images/Arrow.svg')} alt='>' />
          }
        />
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.75}
        totalSlides={count}
        visibleSlides={visibleSlides}
        step={visibleSlides}
        style={{ width: '100%' }}
        dragEnabled='true'
        className='details-closed'
        infinite='true'
      >
        {buttons}
        <Slider>{slides}</Slider>
      </CarouselProvider>
    </React.Fragment>
  );
};

export default Carousel;
