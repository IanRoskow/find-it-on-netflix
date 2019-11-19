import React, { PureComponent } from 'react';
import Netflix from '../../api/Netflix';
import Carousel from './Carousel/Carousel';
import MovieDetailContainer from '../MovieDetailsContainer/MovieDetailsContainer';

export default class CarouselContainer extends PureComponent {
  state = { movieDetails: {} };

  closeMovie = () => {
    let slider = document.querySelector('.carousel');
    document.querySelector('li[selected]').removeAttribute('selected');
    slider.classList.add('details-closed');
    slider.classList.remove('details-open');
    this.setState({ movieDetails: {} });
  };

  getMovie = async ID => {
    this.setState({ movieDetails: {} });
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: ID
      }
    });
    this.setState({ movieDetails: response.data.RESULT });
  };

  render() {
    //Need to create loading carousel component
    let carousel = this.props.movieList.length ? (
      <Carousel
        movieList={this.props.movieList}
        selectMovie={ID => this.getMovie(ID)}
      />
    ) : null; //todo <LoadingCarousel/> instead of null

    console.log(this.state.movieDetails.length);
    console.log(this.props.movieList.length);
    let movieDetails =
      Object.entries(this.state.movieDetails).length &&
      this.props.movieList.length ? (
        <MovieDetailContainer
          movieDetails={this.state.movieDetails}
          closeMovie={this.closeMovie}
        />
      ) : null;
    return (
      <React.Fragment>
        {carousel}
        {movieDetails}
      </React.Fragment>
    );
  }
}
