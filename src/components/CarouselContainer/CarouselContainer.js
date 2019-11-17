import React, { Component } from 'react';
import Netflix from '../../api/Netflix';
import Carousel from './Carousel/Carousel';
import MovieDetailContainer from '../MovieDetailsContainer/MovieDetailsContainer';

export default class CarouselContainer extends Component {
  state = { movieID: '', movieList: [] };

  getNetflix = async () => {
    let genre = this.props.genre;
    let searchTerm = this.props.searchTerm;

    const currentYear = new Date().getFullYear();
    let sort = 'Rating';
    if (!genre.length) {
      genre = '0';
      sort = 'Relevance';
    }

    const response = await Netflix.get('', {
      params: {
        q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!${genre}-!Any-!Any-!Any-!gt0-!{downloadable}`,
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: sort,
        p: '1',
        sa: 'or'
      }
    });

    this.setState({ movieList: response.data.ITEMS });
  };

  setMovieID = ID => {
    this.setState({ movieID: ID });
  };

  componentDidUpdate() {
    this.getNetflix();
  }

  render() {
    //Need to create loading carousel component
    let carousel = this.state.movieList ? (
      <Carousel
        movieList={this.state.movieList}
        selectMovie={ID => this.setMovieID(ID)}
      />
    ) : null; //todo <LoadingCarousel/> instead of null

    let movieDetails = this.state.movieID ? (
      <MovieDetailContainer
        movieID={this.state.movieID}
        selectMovie={ID => this.setMovieID(ID)}
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
