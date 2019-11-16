import React, { Component } from 'react';
import Netflix from '../../api/Netflix';
import MovieDetails from './MovieDetails/MovieDetails';

export default class MovieDetailsContainer extends Component {
  state = { movieDetails: '' };

  getMovie = async () => {
    let slider = document.querySelector('.carousel');
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: this.props.movieID
      }
    });
    this.setState({ movieDetails: response.data.RESULT });
  };

  componentDidUpdate() {
    this.getMovie();
  }

  closeMovie = () => {
    let slider = document.querySelector('.carousel');
    document.querySelector('li[selected]').removeAttribute('selected');
    slider.classList.add('details-closed');
    slider.classList.remove('details-open');
    this.props.selectMovie('');
  };

  render() {
    return (
      <MovieDetails
        closeMovie={this.closeMovie}
        movieDetails={this.state.movieDetails}
      />
    );
  }
}
