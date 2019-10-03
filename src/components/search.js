import React from 'react';
import Netflix from '../api/Netflix';
import { Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '', genre: '0', genres: [] };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term, this.state.genre);
  };

  getGenres = async () => {
    const response = await Netflix.get('', {
      params: {
        t: 'genres'
      }
    });

    this.setState({ genres: response.data.ITEMS });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const genres = this.state.genres.map(genre => {
      let key = Object.keys(genre);
      if (genre[key].length === 1) {
        return (
          <option key={key} value={genre[key][0]}>
            {key}
          </option>
        );
      }
      console.log(Object.keys(genre));
      console.log(genre[Object.keys(genre)]);
    });

    return (
      <div className='ui segment'>
        <form onSubmit={this.onFormSubmit} className='ui form'>
          <div className='field'>
            <input
              type='text'
              value={this.state.term}
              placeholder='Search for your favorite movie'
              onChange={e => this.setState({ term: e.target.value })}
            />
          </div>
          <select
            name='genres'
            value={this.state.genre}
            multiple=''
            onChange={e => this.setState({ genre: e.target.value })}
            className='ui fluid dropdown'
          >
            {genres}
          </select>
          <Button>Click Here</Button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
