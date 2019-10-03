import React from 'react';
import Netflix from '../api/Netflix';
import SearchBar from '../components/search';
import Results from './results';

class App extends React.Component {
  state = { movies: [], genres: [] };

  getNetflix = async (searchTerm, genre) => {
    const currentYear = new Date().getFullYear();
    console.log(genre);
    console.log(searchTerm);
    const response = await Netflix.get('', {
      params: {
        q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!${genre}-!Any-!Any-!Any-!gt0-!{downloadable}`,
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'or'
      }
    });

    this.setState({ movies: response.data.ITEMS });
  };

  render() {
    return (
      <div className='container'>
        <SearchBar genres={this.state.genres} onSubmit={this.getNetflix} />
        <Results movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
