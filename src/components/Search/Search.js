import React, { PureComponent } from 'react';
import { Form, Dropdown, Button, Icon } from 'semantic-ui-react';
import styled from 'styled-components';

const StyledForm = styled(Form)`
  &&&& {
    @media (max-width: 780px) {
      font-size: 16px;
    }
  }
`;

const StyledInput = styled(Form.Input)`
  &&&&&& input {
    ::placeholder {
      font-weight: bold;
      color: black;
      opacity: 1;
    }
    :focus::placeholder {
      opacity: 0.6;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr;
  grid-template-rows: 38px;
  grid-gap: 15px;
  max-width: 800px;
  margin: 130px auto 20px;

  @media (max-width: 780px) {
    grid-template-rows: 38px 38px 38px;
    grid-template-columns: 1fr;
  }
`;

class SearchBar extends PureComponent {
  state = { term: '', genre: '' };

  onFormSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.term, this.state.genre);
  };

  render() {
    //TODO for each in the drop down state we will create a custom row of movies with a header.
    console.log('running');
    return (
      <StyledForm onSubmit={this.onFormSubmit}>
        <Grid>
          <StyledInput
            inverted
            type='text'
            placeholder='Search by movie title.'
            value={this.state.term}
            onChange={e => this.setState({ term: e.target.value, genre: '' })}
            action={{ icon: 'search' }}
          />
          <Dropdown
            placeholder='Search by genre.'
            fluid
            selection
            button
            options={this.props.genres}
            lazyLoad
            value={this.state.genre}
            onChange={(e, d) => {
              this.setState({ term: '', genre: d.value }, () =>
                this.props.onSubmit(this.state.term, this.state.genre)
              );
            }}
          />
        </Grid>
      </StyledForm>
    );
  }
}

export default SearchBar;
