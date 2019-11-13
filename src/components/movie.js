import React from 'react';
import Netflix from '../api/Netflix';
import he from 'he';
import {
  Header,
  Dimmer,
  Divider,
  Loader,
  Icon,
  Item,
  Flag
} from 'semantic-ui-react';

import '../assets/css/movie.css';

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

const movie = props => {
  let details = (
    <Item.Group
      style={{
        height: '245px',
        backgroundColor: '#131313',
        transitionDuration: '500ms'
      }}
    >
      <Item>
        {/* <Dimmer active>
          <Loader size='big'>Loading</Loader>
        </Dimmer> */}
      </Item>
    </Item.Group>
  );

  if (props.movie.nfinfo) {
    let Sidebar = (
      <div>
        <MovieMeta
          icon={<Icon inverted fitted color='yellow' name='imdb' />}
          data={props.movie.imdbinfo.rating}
        />
        <MovieMeta
          icon={<Icon inverted fitted color='black' name='time' />}
          data={props.movie.imdbinfo.runtime}
        />
        <MovieMeta icon='' data={props.movie.nfinfo.released} />
        <MovieMeta icon='' data={props.movie.imdbinfo.genre} />
        <MovieMeta
          icon={<Icon inverted fitted color='blue' name='trophy' />}
          data={props.movie.imdbinfo.awards}
        />
      </div>
    );

    let flags = props.movie.country.map(flag => {
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
          <Item>
            <Item.Image
              style={{ width: '200px', minHeight: '280px' }}
              src={props.movie.nfinfo.image1}
            />
            <Item.Content
              style={{
                position: 'relative',
                padding: '20px 0px',
                margin: '0px 20px',
                transition: 'opacity 250ms'
              }}
            >
              <Item.Header style={{ color: 'white', fontSize: '1.6em' }}>
                {props.movie.nfinfo.title}
              </Item.Header>
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
                {he.decode(props.movie.nfinfo.synopsis)}
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
            </Item.Content>
          </Item>
        </Item.Group>
        <Divider />
      </React.Fragment>
    );
  }

  return details;
};

export default movie;
