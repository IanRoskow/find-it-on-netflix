import PropTypes from 'prop-types';
import { Dot } from 'pure-react-carousel';
import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';

const CustomDotGroup = ({ slides, count, size, callBack }) => {
  return (
    <Container textAlign='center'>
      <Button.Group size={size}>
        {[...Array(slides).keys()].map(slide => {
          slide = slide * count;
          return (
            <Button
              onClick={callBack}
              as={Dot}
              key={slide}
              icon='circle'
              slide={slide}
            />
          );
        })}
      </Button.Group>
    </Container>
  );
};

CustomDotGroup.defaultProps = {
  size: 'mini'
};

CustomDotGroup.propTypes = {
  slides: PropTypes.number.isRequired,
  size: PropTypes.string
};

export default CustomDotGroup;
