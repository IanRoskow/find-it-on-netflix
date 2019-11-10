import React from 'react';
import Netflix from '../api/Netflix';
import {
  Segment,
  Item,
  Dimmer,
  Loader,
  Placeholder,
  Flag
} from 'semantic-ui-react';

const movie = props => {
  let slider = document.querySelector('.carousel');
  let details = (
    <Item.Group
      style={{
        height: '245px',
        position: 'relative',
        top: '-70px',
        'background-color': '#131313'
      }}
    >
      <Item>
        <Item.Image image />
        <Item.Content></Item.Content>
      </Item>
    </Item.Group>
  );

  if (props.movie.nfinfo) {
    slider.classList.add('details-open');
    slider.classList.remove('details-closed');
    let flags = props.movie.country.map(flag => {
      return <Flag name={flag.ccode} title={flag.country} />;
    });

    details = (
      <Item.Group
        style={{
          position: 'relative',
          top: '-70px',
          'background-color': '#131313'
        }}
      >
        <Item>
          <Item.Image src={props.movie.nfinfo.image1} />
          <Item.Content>
            <Item.Header style={{ color: 'white' }} as='a'>
              {props.movie.nfinfo.title}
            </Item.Header>
            <Item.Meta>
              <span style={{ color: 'white' }} className='cinema'>
                {props.movie.imdbinfo.genre}
              </span>
            </Item.Meta>
            <Item.Description style={{ color: 'white' }}>
              {props.movie.nfinfo.synopsis}
            </Item.Description>
            <Item.Extra>{flags}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  return <div>{details}</div>;
};

export default movie;
