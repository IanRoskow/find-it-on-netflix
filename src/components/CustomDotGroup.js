import PropTypes from 'prop-types';
import { Dot, ButtonBack, ButtonNext } from 'pure-react-carousel';
import React from 'react';
import { Button, Container, Icon } from 'semantic-ui-react';

const CustomDotGroup = ({ slides, size }) => {
  console.log('This is the count 2 ' + slides);

  return (
    <Container textAlign='center'>
      <ButtonBack children={<Icon name='angle left' />} />
      <Button.Group size={size}>
        {[...Array(slides).keys()].map(slide => {
          console.log(slide);
          slide = slide * 5;
          return <Button as={Dot} key={slide} icon='circle' slide={slide} />;
        })}
      </Button.Group>
      <ButtonNext children={<Icon name='angle right' />} />
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
