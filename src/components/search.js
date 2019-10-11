import React from 'react';
import Netflix from '../api/Netflix';
import { Segment, Form, Dropdown, Button } from 'semantic-ui-react';

class SearchBar extends React.Component {
  state = { term: '', genre: '', genres: [], dropDown: [] };

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

  async componentDidMount() {
    await this.getGenres();

    const genres = this.state.genres.reduce((result, genre) => {
      let key = `${Object.keys(genre)}`;
      let text = key.replace(/&amp;/g, '&');
      let value = genre[key].join(';');
      if (genre[key].length === 1) {
        result.push({ key, value, text });
      }
      return result;
    }, []);

    this.setState({ dropDown: genres });
  }

  render() {
    //TODO for each in the drop down state we will create a custom row of movies with a header.
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Input
            type='text'
            placeholder='Search for your favorite movie'
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value })}
          />
          <Dropdown
            clearable
            fluid
            search
            selection
            options={this.state.dropDown}
            placeholder='Select a genre'
            value={this.state.genre}
            onChange={(e, d) => {
              this.setState({ genre: d.value });
            }}
          />
          <Button>Click Here</Button>
        </Form>
      </Segment>
    );
  }
}

export default SearchBar;
