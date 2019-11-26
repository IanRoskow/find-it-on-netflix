import React from 'react';
import SearchBar from '../Search/Search';
import CarouselContainer from '../CarouselContainer/CarouselContainer';
import { Header } from 'semantic-ui-react';
import he from 'he';
import { getGenres, getNetflix } from '../../utils/utils';
import styled from 'styled-components';


import './App.css';
import { isAbsolute } from 'path';

const Container = styled.div`
  width: 90%;
  margin: auto;
  max-width: 1440px;
  @media(max-width: 780px){
    width: 100%;
    padding:0px 20px;
  };
`;

class App extends React.Component {
  state = {
    dropDown: [],
    movieList: [],
    isLoading: false,
    slideCount: 0
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

  countSlides = () => {
    console.log('counting slides');
    let slideCount = 0;
    if (window.innerWidth >= 1200) {
      slideCount = 7;
    } else if (window.innerWidth >= 992) {
      slideCount = 6;
    } else if (window.innerWidth >= 768) {
      slideCount = 5;
    } else {
      slideCount = 1;
    }
    console.log(window.innerWidth);
    console.log(slideCount);
    console.log(this.state.slideCount);
    if (slideCount !== this.state.slideCount) {
      this.setState({ slideCount });
    }
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
    this.countSlides();
    window.addEventListener('resize', this.countSlides);
  }

  render() {
    let carousel =
      this.state.movieList.length || this.state.isLoading ? (
        <CarouselContainer
          movieList={this.state.movieList}
          isLoading={this.state.isLoading}
          slideCount={this.state.slideCount}
        />
      ) : null;
    return (
      <Container>
        <Header as='h1' color='red' textAlign='center' style={{ position: 'absolute', top: '0', left: '0', padding: '20px 20px'  }}>
          Netflix Search
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
