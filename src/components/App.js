import React from 'react';
import Netflix from '../api/Netflix';
import SearchBar from '../components/search';
import Results from './results';

// class App extends React.Component {
//   render() {
//     console.log('Connected');
//     return 'Connected';
//   }
// }

class App extends React.Component {
  state = { movies: [] };

  getNetflix = async searchTerm => {
    console.log(searchTerm);
    const currentYear = new Date().getFullYear();

    const response = await Netflix.get('', {
      params: {
        q: `${searchTerm}-!1900,${currentYear}-!0,5-!0,10-!0-!Any-!Any-!Any-!gt0-!{downloadable}`,
        t: 'ns',
        cl: 'all',
        st: 'adv',
        ob: 'Relevance',
        p: '1',
        sa: 'or'
      }
    });
    console.log(response.data.ITEMS);
    this.setState({ movies: response.data.ITEMS });
  };

  render() {
    return (
      <div className='container'>
        <SearchBar onSubmit={this.getNetflix} />
        <Results movies={this.state.movies} />
      </div>
    );
  }
}

export default App;
