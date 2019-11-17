import React from 'react';
import Netflix from '../../api/Netflix';
import SearchBar from '../Search/Search';
import CarouselContainer from '../CarouselContainer/CarouselContainer';
import { Container, Header, Icon } from 'semantic-ui-react';
import he from 'he';

import './App.css';

class App extends React.Component {
  state = {
    searchTerm: '',
    genre: ''
  };

  setTerms = (searchTerm, genre) => {};

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
    let carousel =
      this.state.searchTerm || this.state.genre ? (
        <CarouselContainer
          searchTerm={this.state.searchTerm}
          genre={this.state.genre}
        />
      ) : null;
    return (
      <Container>
        <Header as='h1' color='red' textAlign='center' style={{ margin: 60 }}>
          Where is it streaming?
        </Header>
        <SearchBar
          genres={this.state.dropDown}
          onSubmit={(searchTerm, genre) => this.setState({ searchTerm, genre })}
        />
        {carousel}
      </Container>
    );
  }
}

export default App;
