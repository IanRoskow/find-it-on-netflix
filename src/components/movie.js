import React from 'react';
import Netflix from '../api/Netflix';
import {
  Segment,
  Item,
  Dimmer,
  Loader,
  Label,
  Placeholder,
  Flag
} from 'semantic-ui-react';

const movie = props => {
  let details = (
    <Placeholder style={{ height: 150, width: 150 }}>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>
    </Placeholder>
  );

  if (props.movie.nfinfo) {
    console.log(props.movie.country);
    let flags = props.movie.country.map(flag => {
      return <Flag name={flag.ccode} title={flag.country} />;
    });

    details = (
      <Item.Group>
        <Item>
          <Item.Image src={props.movie.nfinfo.image1} />
          <Item.Content>
            <Item.Header as='a'>{props.movie.nfinfo.title}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{props.movie.imdbinfo.genre}</span>
            </Item.Meta>
            <Item.Description>{props.movie.nfinfo.synopsis}</Item.Description>
            <Item.Extra>{flags}</Item.Extra>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  }

  return <Segment>{details}</Segment>;
};

export default movie;
