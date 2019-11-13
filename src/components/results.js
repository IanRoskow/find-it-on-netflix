import React from 'react';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Transition,
  Dimmer,
  Loader,
  Segment,
  Header,
  Icon,
  Item,
  Button
} from 'semantic-ui-react';

import Netflix from '../api/Netflix';
import MovieDetails from '../components/movie';
import CustomCardSlide from './CustomCardSlide';
import CustomDotGroup from './CustomDotGroup';

import '../assets/css/results.css';
let visible = false;
let openLoader = { minHeight: '0px' };

class results extends React.Component {
  state = { movie: '', loading: false };

  //Load individual movie data on callback of selected title
  getMovie = async Id => {
    openLoader = { height: '281px' };
    this.setState({ loading: true, movie: '' });
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: Id
      }
    });
    this.setState({ movie: response.data.RESULT, loading: false });
  };

  lazyLoad() {
    let slider = document.querySelector('.carousel__slider-tray-wrapper');
    let components = document.querySelectorAll(
      '.carousel__slider-tray-wrapper li'
    );
    let width = slider.clientWidth;
    let style = window.getComputedStyle(slider.querySelector('ul'));
    // eslint-disable-next-line no-undef
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    let locationH = matrix.m41 * -1;
    console.log(locationH);
    console.log(width);
    console.log(components);
    console.log(locationH + width * 4);
    components.forEach(el => {
      console.log(el);
      console.log(el.offsetLeft);
      if (el.offsetLeft < locationH + width * 4) {
        let image = el.querySelector('img');
        if (!image.src) {
          image.src = image.getAttribute('data-src');
        }
      }
    });
  }

  componentDidUpdate() {
    // let slider = document.querySelector('.carousel__slider-tray-wrapper');
    // let components = document.querySelectorAll(
    //   '.carousel__slider-tray-wrapper li'
    // );
    // let width = slider.clientWidth;
    // let style = window.getComputedStyle(slider);
    // // eslint-disable-next-line no-undef
    // let matrix = new WebKitCSSMatrix(style.webkitTransform);
    // let location = matrix.m41 * -1;
    // console.log(location);
    // console.log(width);
    // console.log(components);
    // console.log(location + width * 2);
    // components.forEach(el => {
    //   console.log(el);
    //   console.log(el.offsetLeft);
    //   if (el.offsetLeft < location + width * 2) {
    //     let image = el.querySelector('img');
    //     if (!image.src) {
    //       image.src = image.getAttribute('data-src');
    //     }
    //   }
    // });
  }

  render() {
    //Set the mount of visible slides, this will change as the viewport changes.
    let visibleSlides = 7;

    //Map the movie titles to an array of card slides
    let count = 0;
    const slides = this.props.movies.map(movie => {
      count++;
      let image = movie.largeimage.length ? movie.largeimage : movie.image;
      let imageAttribute = count < visibleSlides * 3 ? 'src' : 'data-src';
      let variableAttribute = { [imageAttribute]: image };
      console.log(variableAttribute);
      //may need to refactor for mobile, when slide count is one
      let first = count % visibleSlides === 1 ? 'first-slide' : '';
      let last = count % visibleSlides === 0 ? 'last-slide' : '';
      return (
        <CustomCardSlide
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
          callBack={() => this.getMovie(movie.netflixid)}
        />
      );
    });

    //Add extra blank slides to ensure it first and last slides in the carousel stay consistent
    let extraSlides = count ? visibleSlides - (count % visibleSlides) : 0;
    for (let i = 1; i <= extraSlides; i++) {
      count++;
      slides.push(
        <CustomCardSlide
          image={<img data-src='' className='ui small' width='150px' alt='' />}
          index={count}
          classToAdd={''}
          callBack={() => {}}
        />
      );
    }

    //Create the dot navigation for the carousel
    let dotCount = Math.round(count / visibleSlides);
    let dotNavigation = (
      <CustomDotGroup
        slides={dotCount}
        count={visibleSlides}
        callBack={this.lazyLoad}
      />
    );

    //Create the left and right buttons for the carousel
    let buttons =
      count === 0 ? null : (
        <React.Fragment>
          <ButtonBack
            children={
              <img src={require('../assets/images/Arrow.svg')} alt='<' />
            }
          />
          <ButtonNext
            onClick={this.lazyLoad}
            children={
              <img src={require('../assets/images/Arrow.svg')} alt='>' />
            }
          />
        </React.Fragment>
      );

    //Conditional render of the movie details depending on if the title was selected.
    let movieDetails = null;
    if (this.state.movie === 'loading') {
      movieDetails = <MovieDetails movie='Loading' />;
    } else if (this.state.movie) {
      movieDetails = <MovieDetails movie={this.state.movie} />;
    }
    let isActive = this.state.loading ? 'active' : '';
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
          <div
            className='transitionMovie'
            style={{ position: 'relative', top: '-50px', ...openLoader }}
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
          </div>
        </CarouselProvider>
      </React.Fragment>
    );
  }
}

export default results;
