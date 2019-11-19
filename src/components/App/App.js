import React from 'react';
import Netflix from '../../api/Netflix';
import SearchBar from '../Search/Search';
import CarouselContainer from '../CarouselContainer/CarouselContainer';
import { Container, Header, Icon } from 'semantic-ui-react';
import he from 'he';
import { getGenres, getNetflix } from '../../utils/utils';

import './App.css';

class App extends React.Component {
  state = {
    dropDown: [],
    movieList: []
  };

  // getNetflix = async props => {
  //   this.setState({ movieList: [] });
  //   let genre = props.genre;
  //   let searchTerm = props.searchTerm;

  //   const currentYear = new Date().getFullYear();
  //   let sort = 'Rating';
  //   if (!genre.length) {
  //     genre = '0';
  //     sort = 'Relevance';
  //   }

  //   const response = await Netflix.get('', {
  //     params: {
  //       q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!${genre}-!Any-!Any-!Any-!gt0-!{downloadable}`,
  //       t: 'ns',
  //       cl: 'all',
  //       st: 'adv',
  //       ob: sort,
  //       p: '1',
  //       sa: 'or'
  //     }
  //   });

  //   this.setState({ movieList: response.data.ITEMS });
  // };

  getMovies = async (searchTerm, genre) => {
    console.log(searchTerm);
    console.log(genre);
    this.setState({ movieList: [] });
    let data = await getNetflix(searchTerm, genre);
    console.log(data);
    this.setState({ movieList: data });
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
    let carousel = this.state.movieList.length ? (
      <CarouselContainer movieList={this.state.movieList} />
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
