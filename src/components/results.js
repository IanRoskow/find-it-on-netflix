import React from 'react';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Segment, Header, Icon, Item, Button } from 'semantic-ui-react';

import Netflix from '../api/Netflix';
import MovieDetails from '../components/movie';
import CustomCardSlide from './CustomCardSlide';
import CustomDotGroup from './CustomDotGroup';

import '../assets/css/results.css';

class results extends React.Component {
  state = { movie: '' };

  getMovie = async Id => {
    this.setState({ movie: 'loading' });
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: Id
      }
    });
    this.setState({ movie: response.data.RESULT });
  };

  render() {
    let movieDetails = null;
    let visibleSlides = 7;

    if (this.state.movie === 'loading') {
      movieDetails = 'loading';
    } else if (this.state.movie) {
      movieDetails = <MovieDetails movie={this.state.movie} />;
    }
    console.log('Movies' + this.props.movies);
    let count = 0;
    const slides = this.props.movies.map(movie => {
      console.log('entered');
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
          meta={
            <button
              className='expand'
              onClick={() => this.getMovie(movie.netflixid)}
            >
              <img
                className='rotate'
                src={require('../assets/images/Arrow.svg')}
                alt='v'
              />
            </button>
          }
        />
      );
    });
    console.log(slides);
    console.log(`Count: ${count} visible: ${visibleSlides}`);
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
    console.log(slides);
    let dotCount = Math.round(count / visibleSlides);
    console.log(`Dot: ${dotCount} Count: ${count} visible: ${visibleSlides}`);

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

    return (
      <React.Fragment>
        <CarouselProvider
          naturalSlideWidth={1}
          naturalSlideHeight={1.75}
          totalSlides={count}
          visibleSlides={visibleSlides}
          step={visibleSlides}
          style={{ width: '100%' }}
        >
          {buttons}
          <Slider>{slides}</Slider>
          <CustomDotGroup slides={dotCount} count={visibleSlides} />
        </CarouselProvider>
        {movieDetails}
      </React.Fragment>
    );
  }
}

export default results;
