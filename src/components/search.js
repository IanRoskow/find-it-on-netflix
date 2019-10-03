import React from 'react';
import Netflix from '../api/Netflix';
import { Segment, Form, Dropdown, Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '', genre: [], genres: [] };

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

  onAddItem = e => {
    this.setState(state => {
      console.log(e.target);
      const list = state.genre.concat(e.target.value);

      return {
        list,
        term: '',
        genres: this.state.genres
      };
    });
  };

  componentDidMount() {
    this.getGenres();
  }

  render() {
    const countryOptions = [
      { key: 'af', value: 'af', text: 'Afghanistan' },
      { key: 'ax', value: 'ax', text: 'Aland Islands' },
      { key: 'al', value: 'al', text: 'Albania' },
      { key: 'dz', value: 'dz', text: 'Algeria' },
      { key: 'as', value: 'as', text: 'American Samoa' },
      { key: 'ad', value: 'ad', text: 'Andorra' },
      { key: 'ao', value: 'ao', text: 'Angola' },
      { key: 'ai', value: 'ai', text: 'Anguilla' },
      { key: 'ag', value: 'ag', text: 'Antigua' },
      { key: 'ar', value: 'ar', text: 'Argentina' },
      { key: 'am', value: 'am', text: 'Armenia' },
      { key: 'aw', value: 'aw', text: 'Aruba' },
      { key: 'au', value: 'au', text: 'Australia' },
      { key: 'at', value: 'at', text: 'Austria' },
      { key: 'az', value: 'az', text: 'Azerbaijan' },
      { key: 'bs', value: 'bs', text: 'Bahamas' },
      { key: 'bh', value: 'bh', text: 'Bahrain' },
      { key: 'bd', value: 'bd', text: 'Bangladesh' },
      { key: 'bb', value: 'bb', text: 'Barbados' },
      { key: 'by', value: 'by', text: 'Belarus' },
      { key: 'be', value: 'be', text: 'Belgium' },
      { key: 'bz', value: 'bz', text: 'Belize' },
      { key: 'bj', value: 'bj', text: 'Benin' }
    ];

    const genres = this.state.genres.map(genre => {
      let key = `${Object.keys(genre)}`;
      let value = `${genre[key][0]}`;
      if (genre[key].length === 1) {
        return { key, value, text: key };
      } else {
        //TO DO - add all the values in the proper query string
        return { key, value, text: key };
      }
    });
    //TODO for each in the drop down state we will create a custom row of movies with a header.
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            type='text'
            value={this.state.term}
            placeholder='Search for your favorite movie'
            onChange={e => this.setState({ term: e.target.value })}
          />
          <Dropdown
            clearable
            fluid
            multiple
            search
            selection
            options={genres}
            placeholder='Select a genre'
            value={this.state.genre}
            onChange={e =>
              this.setState({
                genre: e.target.value
              })
            }
          />
          <Button>Click Here</Button>
        </Form>
      </Segment>
    );
  }
}

export default SearchBar;
