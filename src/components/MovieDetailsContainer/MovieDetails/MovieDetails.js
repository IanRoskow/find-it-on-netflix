import React from 'react';
import he from 'he';
import {
  Transition,
  Dimmer,
  Loader,
  Header,
  Divider,
  Icon,
  Item,
  Flag
} from 'semantic-ui-react';
import styled from 'styled-components';

import './MovieDetails.css';

const StyledItem = styled(Item.Content)`
&&&&{
  position: relative;
  padding: 20px 0px;
  margin: 0px 20px;
  transition: opacity 250ms;
  @media (max-width: 780px){
    min-height: 350px;
    margin: 0px;
  }
}
`;

const MovieMeta = props => {
  return (
    <span
      style={{
        padding: '10px 40px 0px 0px',
        float: 'left',
        color: '#828282',
        height: '35px'
      }}
    >
      {props.icon}
      {`  ${props.data}`}
    </span>
  );
};

const flagContainer = {
  position: 'absolute',
  width: '100%',
  bottom: '0px',
  color: 'white',
  boxSizing: 'content-box'
};

const flagStyles = {
  alignItems: 'end',
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 140px)',
  gridTemplateRows: 'repeat(2, 25px)',
  gridAutoColumns: '140px',
  gridAutoFlow: 'column',
  overflowX: 'scroll',
  overflowY: 'hidden',
  height: '70px'
};

const MovieDetails = props => {
  let details = (
    <Item.Group
      style={{
        height: '245px',
        backgroundColor: '#131313',
        transitionDuration: '500ms'
      }}
    >
      <Item></Item>
    </Item.Group>
  );
  if (Object.entries(props.movieDetails).length) {
    let Sidebar = (
      <div>
        <MovieMeta
          icon={<Icon inverted fitted color='yellow' name='imdb' />}
          data={props.movieDetails.imdbinfo.rating}
        />
        <MovieMeta
          icon={<Icon inverted fitted color='black' name='time' />}
          data={props.movieDetails.imdbinfo.runtime}
        />
        <MovieMeta icon='' data={props.movieDetails.nfinfo.released} />
        <MovieMeta icon='' data={props.movieDetails.imdbinfo.genre} />
        <MovieMeta
          icon={<Icon inverted fitted color='blue' name='trophy' />}
          data={props.movieDetails.imdbinfo.awards}
        />
      </div>
    );

    let flags = props.movieDetails.country.map(flag => {
      return <Flag name={flag.ccode} title={flag.country} />;
    });

    details = (
      <React.Fragment>
        <Item.Group
          style={{
            position: 'relative',
            'background-color': 'rgb(20,20,20)'
          }}
        >
          <Item className='Item'>
            <Item.Image
              style={{ width: '200px', minHeight: '280px' }}
              src={props.movieDetails.nfinfo.image1}
            />
            <StyledItem>
              <Item.Header style={{ color: 'white', fontSize: '1.6em' }}>
                {he.decode(props.movieDetails.nfinfo.title)}
              </Item.Header>
              <Icon
                style={{ position: 'absolute', top: '15px', right: '15px' }}
                inverted
                color='grey'
                name='x'
                size='large'
                link
                onClick={props.closeMovie}
              />
              <Item.Meta style={{ overflow: 'hidden', marginTop: '0px' }}>
                {Sidebar}
              </Item.Meta>
              <Item.Description
                style={{
                  color: '#828282',
                  fontSize: '1.2em',
                  marginTop: '15px'
                }}
              >
                {he.decode(props.movieDetails.nfinfo.synopsis)}
              </Item.Description>
              <div style={flagContainer}>
                <Header
                  style={{ marginBottom: '0px' }}
                  as='h5'
                  inverted
                  color='green'
                >
                  Streaming in:
                </Header>
                <div style={flagStyles}>{flags}</div>
              </div>
            </StyledItem>
          </Item>
        </Item.Group>
        <Divider />
      </React.Fragment>
    );
  }

  return (
    <div
      className='transitionMovie'
      style={{ position: 'relative', top: '-50px' }}
    >
      <Transition visible={props.isLoading} animation='fade' duration={250}>
        <Dimmer
          active={props.isLoading}
          style={{ backgroundColor: 'rgb(20, 20, 20)' }}
        >
          <Loader size='big'>Loading</Loader>
        </Dimmer>
      </Transition>
      {details}
    </div>
  );
};

export default MovieDetails;
