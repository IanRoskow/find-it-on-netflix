import React, { PureComponent } from 'react';
import MovieDetails from './MovieDetails/MovieDetails';
import { Transition, Dimmer, Loader } from 'semantic-ui-react';

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
