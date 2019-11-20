import React from 'react';
import SearchBar from '../Search/Search';
import CarouselContainer from '../CarouselContainer/CarouselContainer';
import { Container, Header } from 'semantic-ui-react';
import he from 'he';
import { getGenres, getNetflix } from '../../utils/utils';

import './App.css';

class App extends React.Component {
  state = {
    dropDown: [],
    movieList: [],
    isLoading: false
  };

  getMovies = async (searchTerm, genre) => {
    console.log(searchTerm);
    console.log(genre);
    await this.setState({ movieList: [], isLoading: false });
    this.setState({ isLoading: true });
    let data = await getNetflix(searchTerm, genre);
    console.log(data);
    this.setState({ movieList: data, isLoading: false });
  };

  async componentDidMount() {
    let data = await getGenres();

    const genres = data.reduce((result, genre) => {
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
      this.state.movieList.length || this.state.isLoading ? (
        <CarouselContainer
          movieList={this.state.movieList}
          isLoading={this.state.isLoading}
        />
      ) : null;
    return (
      <Container>
        <Header as='h1' color='red' textAlign='center' style={{ margin: 60 }}>
          Where is it streaming?
        </Header>
        <SearchBar
          genres={this.state.dropDown}
          onSubmit={(searchTerm, genre) => {
            this.getMovies(searchTerm, genre);
          }}
        />
        {carousel}
      </Container>
    );
  }
}

export default App;
