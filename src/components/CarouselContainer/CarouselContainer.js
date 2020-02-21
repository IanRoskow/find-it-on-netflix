import React, { PureComponent } from 'react';
import { getMovieDetails } from '../../utils/utils';
import Carousel from './Carousel/Carousel';
import MovieDetails from '../MovieDetailsContainer/MovieDetails/MovieDetails';
import styled from 'styled-components';

const StyledContainer = styled.div`
  @media (max-width: 780px) {
    width: 80%;
    margin: auto;
  }
`;

export default class CarouselContainer extends PureComponent {
  state = { movieDetails: {}, isLoadingMovie: false };

  closeMovie = () => {
    window.scroll({
      top: window.innerWidth > 780 ? 0 : 316,
      left: 0,
      behavior: 'smooth'
    });
    let slider = document.querySelector('.carousel');
    document.querySelector('li[selected]').removeAttribute('selected');
    slider.classList.add('details-closed');
    slider.classList.remove('details-open');
    this.setState({ movieDetails: {} });
  };

  getMovie = async ID => {
    this.setState({ movieDetails: {}, isLoadingMovie: true });
    window.scroll({
      top: window.innerWidth > 780 ? 215 : 731,
      left: 0,
      behavior: 'smooth'
    });
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await getMovieDetails(ID);
    this.setState({
      movieDetails: response,
      isLoadingMovie: false
    });
  };

  render() {
    //Need to create loading carousel component
    let carousel =
      this.props.movieList.length || this.props.isLoading ? (
        <Carousel
          movieList={this.props.movieList}
          isLoadingMovies={this.props.isLoading}
          selectMovie={ID => this.getMovie(ID)}
          visibleSlides={this.props.slideCount}
        />
      ) : null; //todo <LoadingCarousel/> instead of null

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
        <StyledContainer>{carousel}</StyledContainer>
        {movieDetails}
      </React.Fragment>
    );
  }
}
