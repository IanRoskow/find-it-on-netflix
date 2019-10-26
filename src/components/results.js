import React from 'react';
import {
  CarouselProvider,
  Slider,
  ButtonBack,
  ButtonNext
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { Segment, Image, Icon, Item, Placeholder } from 'semantic-ui-react';

import Netflix from '../api/Netflix';
import MovieDetails from '../components/movie';
import CustomCardSlide from './CustomCardSlide';
import CustomDotGroup from './CustomDotGroup';

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
    let movieDetails = (
      <Item.Group>
        <Item>
          <Placeholder style={{ height: 245, width: 175 }}>
            <Placeholder.Image />
          </Placeholder>
          <Item.Content>
            <Placeholder>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Item.Content>
        </Item>
      </Item.Group>
    );

    if (this.state.movie === 'loading') {
      movieDetails = (
        <Item.Group>
          <Item>
            <Item.Image image />
            <Item.Content></Item.Content>
          </Item>
        </Item.Group>
      );
    } else if (this.state.movie) {
      movieDetails = <MovieDetails movie={this.state.movie} />;
    }

    let count = 0;
    const slides = this.props.movies.map(movie => {
      count++;

      return (
        <CustomCardSlide
          image={movie.image}
          index={0}
          header={movie.title}
          meta={
            <Icon
              link
              onClick={() => this.getMovie(movie.netflixid)}
              name='angle down'
            />
          }
        />
      );
    });
    let dotCount = Math.round(count / 5);

    return (
      <React.Fragment>
        <Segment>
          <CarouselProvider
            naturalSlideWidth={1}
            naturalSlideHeight={1.75}
            totalSlides={count}
            visibleSlides={5}
            step={5}
            style={{ width: '100%' }}
          >
            <Slider>{slides}</Slider>
            <CustomDotGroup slides={dotCount} />
          </CarouselProvider>
          {movieDetails}
        </Segment>
      </React.Fragment>
    );
  }
}

export default results;
