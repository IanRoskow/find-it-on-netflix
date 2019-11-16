import React, { PureComponent } from 'react';
import { Form, Dropdown, Button } from 'semantic-ui-react';

const gridStyles = {
  display: 'grid',
  gridTemplateColumns: '5fr 5fr 2fr',
  gridTemplateRows: '38px',
  gridGap: '15px',
  maxWidth: '800px',
  margin: 'auto'
};

class SearchBar extends PureComponent {
  state = { term: '', genre: '' };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term, this.state.genre);
  };

  render() {
    //TODO for each in the drop down state we will create a custom row of movies with a header.
    return (
      <Form onSubmit={this.onFormSubmit}>
        <div style={gridStyles}>
          <Form.Input
            inverted
            type='text'
            placeholder='Movie, Show, or Actor/Actress '
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value, genre: '' })}
          />
          <Dropdown
            inverted
            lazyLoad
            clearable
            fluid
            search
            selection
            options={this.props.genres}
            placeholder='Crazy Sub-Genres'
            value={this.state.genre}
            onChange={(e, d) => {
              this.setState({ term: '', genre: d.value });
            }}
          />
          <Button type='submit'>Search</Button>
        </div>
      </Form>
    );
  }
}

export default SearchBar;
