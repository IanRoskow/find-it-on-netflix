import React, { PureComponent } from 'react';
import Netflix from '../../api/Netflix';
import Carousel from './Carousel/Carousel';
import MovieDetails from '../MovieDetailsContainer/MovieDetails/MovieDetails';

export default class CarouselContainer extends PureComponent {
  state = { movieDetails: {}, isLoadingMovie: false };

  closeMovie = () => {
    let slider = document.querySelector('.carousel');
    document.querySelector('li[selected]').removeAttribute('selected');
    slider.classList.add('details-closed');
    slider.classList.remove('details-open');
    this.setState({ movieDetails: {} });
  };

  getMovie = async ID => {
    this.setState({ movieDetails: {}, isLoadingMovie: true });
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: ID
      }
    });
    this.setState({
      movieDetails: response.data.RESULT,
      isLoadingMovie: false
    });
  };

  render() {
    //Need to create loading carousel component
    let carousel =
      this.props.movieList.length || this.props.isLoading ? (
        <Carousel
          movieList={this.props.movieList}
          selectMovie={ID => this.getMovie(ID)}
          isLoadingMovies={this.props.isLoading}
        />
      ) : null; //todo <LoadingCarousel/> instead of null

    console.log(this.state.movieDetails.length);
    console.log(this.props.movieList.length);
    let movieDetails =
      Object.entries(this.state.movieDetails).length ||
      this.state.isLoadingMovie ? (
        <MovieDetails
          movieDetails={this.state.movieDetails}
          closeMovie={this.closeMovie}
          isLoading={this.state.isLoadingMovie}
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
