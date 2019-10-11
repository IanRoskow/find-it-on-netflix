import React from 'react';
import Netflix from '../api/Netflix';
import SearchBar from '../components/search';
import Results from './results';
import { Container } from 'semantic-ui-react';
import MovieDetails from '../components/movie';

class App extends React.Component {
  state = {
    movies: [
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      },
      {
        netflixid: '70079583',
        title: 'The Dark Knight',
        image:
          'https://occ-0-1490-1489.1.nflxso.net/dnm/api/v6/XsrytRUxks8BtTRf9HNlZkW2tvY/AAAABTVafl6uf8lmiDMxeNG_2b105SXjtW6--YEZIxVGW4lwazAggLWqDYnWy97SdN3jwK2EiP8fyYC41zIQXC9c7XRuuQ.jpg?r=541',
        synopsis:
          'As Batman, Lt. Gordon and the district attorney continue to dismantle Gotham&#39;s criminal underground, a new villain threatens to undo their good work.',
        rating: '9',
        type: 'movie',
        released: '2008',
        runtime: '2h32m',
        largeimage: 'http://cdn1.nflximg.net/images/2133/8282133.jpg',
        unogsdate: '2015-04-14',
        imdbid: 'tt0468569',
        download: '0'
      }
    ],
    movie: '60029591'
  };

  getNetflix = async (searchTerm, genre) => {
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

    this.setState({ movies: response.data.ITEMS });
  };

  getMovie = async Id => {
    const response = await Netflix.get('', {
      params: {
        t: 'loadvideo',
        q: Id
      }
    });
    this.setState({ movie: response.data.RESULT });
  };

  componentDidMount() {
    this.getMovie('60029591');
  }

  render() {
    return (
      <Container>
        <SearchBar genres={this.state.genres} onSubmit={this.getNetflix} />
        <MovieDetails movie={this.state.movie} />
        <Results movies={this.state.movies} />
      </Container>
    );
  }
}

export default App;
