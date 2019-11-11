import React from 'react';
import Netflix from '../api/Netflix';
import SearchBar from '../components/search';
import Results from './results';
import { Container, Header, Icon } from 'semantic-ui-react';
import he from 'he';

import '../assets/css/app.css';

class App extends React.Component {
  state = {
    movies: [],
    dropDown: []
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

  getGenres = async () => {
    const response = await Netflix.get('', {
      params: {
        t: 'genres'
      }
    });

    this.setState({ genres: response.data.ITEMS });
  };

  async componentDidMount() {
    await this.getGenres();

    const genres = this.state.genres.reduce((result, genre) => {
      let key = `${Object.keys(genre)}`;
      let text = he.decode(key);
      let value = genre[key].join(';');
      if (genre[key].length === 1) {
        result.push({ key, value, text });
      }
      return result;
    }, []);

    this.setState({ dropDown: genres });
  }

  render() {
    return (
      <Container>
        <Header as='h1' color='red' textAlign='center' style={{ margin: 60 }}>
          Where is it streaming?
        </Header>
        <SearchBar genres={this.state.dropDown} onSubmit={this.getNetflix} />
        <Results movies={this.state.movies} />
      </Container>
    );
  }
}

export default App;
