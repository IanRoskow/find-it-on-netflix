import React from 'react';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import {
  Divider,
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

class results extends React.Component {
  state = { movie: '' };

  //Load individual movie data on callback of selected title
  getMovie = async Id => {
    this.setState({ movie: 'loading' });
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: Id
      }
    });
    this.setState({ movie: response.data.RESULT });
  };

  render() {
    //Set the mount of visible slides, this will change as the viewport changes.
    let visibleSlides = 7;

    //Map the movie titles to an array of card slides
    let count = 0;
    const slides = this.props.movies.map(movie => {
      count++;
      let image = movie.largeimage.length ? movie.largeimage : movie.image;
      //may need to refactor for mobile, when slide count is one
      let first = count % visibleSlides === 1 ? 'first-slide' : '';
      let last = count % visibleSlides === 0 ? 'last-slide' : '';
      return (
        <CustomCardSlide
          image={
            <img src={image} width='150px' className='ui small' alt='Error' />
          }
          index={count}
          classToAdd={first + last}
          header={
            <div style={{ textAlign: 'center', color: 'white' }}>
              {movie.title}
            </div>
          }
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
          image={''}
          index={count}
          classToAdd={''}
          callBack={() => {}}
        />
      );
    }

    //Create the dot navigation for the carousel
    let dotCount = Math.round(count / visibleSlides);
    let dotNavigation = (
      <CustomDotGroup slides={dotCount} count={visibleSlides} />
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
        >
          {buttons}
          <Slider>{slides}</Slider>
          {dotNavigation}
          <div className='transitionMovie'>{movieDetails}</div>
        </CarouselProvider>
      </React.Fragment>
    );
  }
}

export default results;
