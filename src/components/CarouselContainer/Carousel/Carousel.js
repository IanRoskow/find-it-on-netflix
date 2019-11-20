import React from 'react';
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

const lazyLoad = () => {
  // if(document.querySelector('.details-open')) this.closeMovie();
  let slider = document.querySelector('.carousel__slider-tray-wrapper');
  let components = document.querySelectorAll(
    '.carousel__slider-tray-wrapper li'
  );
  let width = slider.clientWidth;
  let style = window.getComputedStyle(slider.querySelector('ul'));
  // eslint-disable-next-line no-undef
  let matrix = new WebKitCSSMatrix(style.webkitTransform);
  let locationH = matrix.m41 * -1;
  components.forEach(el => {
    if (el.offsetLeft < locationH + width * 4) {
      let image = el.querySelector('img');
      if (!image.src) {
        image.src = image.getAttribute('data-src');
      }
    }
  });
};

const Carousel = ({ movieList, selectMovie, isLoadingMovies }) => {
  //Set the mount of visible slides, this will change as the viewport changes.
  let visibleSlides = 7;

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
          <img
            {...variableAttribute}
            hasMasterSpinner='true'
            className='ui small'
            width='150px'
            alt='Error'
          />
        }
        index={count}
        classToAdd={first + last}
        callBack={() => selectMovie(movie.netflixid)}
      />
    );
  });

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
  console.log(count);
  let needExtra = count % visibleSlides;
  let extraSlides = needExtra ? visibleSlides - needExtra : 0;
  console.log(extraSlides);
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

  // //Create the dot navigation for the carousel
  // let dotCount = Math.round(count / visibleSlides);
  // let dotNavigation = (
  //   <CustomDotGroup
  //     slides={dotCount}
  //     count={visibleSlides}
  //     callBack={lazyLoad}
  //   />
  // );

  //Create the left and right buttons for the carousel
  let buttons =
    count === 0 ? null : (
      <React.Fragment>
        <ButtonBack
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

  //Conditional render of the movie details depending on if the title was selected.
  // let movieDetails = null;
  // if (this.state.movie === 'loading') {
  //   movieDetails = <MovieDetails movie='Loading' />;
  // } else if (this.state.movie) {
  //   movieDetails = (
  //     <MovieDetails movie={this.state.movie} callBack={this.closeMovie} />
  //   );
  // }
  // let isActive = this.state.loading ? 'active' : '';
  //Return the results carousel with the movie titles
  return (
    <React.Fragment>
      <CarouselProvider
        naturalSlideWidth={1}
        naturalSlideHeight={1.75}
        totalSlides={count}
        visibleSlides={visibleSlides}
        step={visibleSlides}
        style={{ width: '100%' }}
        className='details-closed'
        infinite='true'
      >
        {buttons}
        <Slider>{slides}</Slider>
        {/* The buttons need to be disabled until I can think of a fix for the lazy load */}
        {/* {dotNavigation} */}
        {/* <div
          className='transitionMovie'
          style={{ position: 'relative', top: '-50px' }}
        >
          <Transition
            visible={this.state.loading}
            animation='fade'
            duration={250}
          >
            <Dimmer
              active={isActive}
              style={{ backgroundColor: 'rgb(20, 20, 20)' }}
            >
              <Loader size='big'>Loading</Loader>
            </Dimmer>
          </Transition>
          {movieDetails}
        </div> */}
      </CarouselProvider>
    </React.Fragment>
  );
};

export default Carousel;
