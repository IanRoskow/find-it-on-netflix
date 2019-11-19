import React, { PureComponent } from 'react';
import Netflix from '../../api/Netflix';
import MovieDetails from './MovieDetails/MovieDetails';

export default class MovieDetailsContainer extends PureComponent {
  render() {
    let movieDetails = this.props.movieDetails ? (
      <MovieDetails
        closeMovie={this.props.closeMovie}
        movieDetails={this.props.movieDetails}
      />
    ) : null; //todo <LoaderMovie /> instead of null
    return movieDetails;
  }
}
