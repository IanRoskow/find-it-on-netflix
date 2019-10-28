import PropTypes from 'prop-types';
import { Slide } from 'pure-react-carousel';
import React from 'react';
import { Card } from 'semantic-ui-react';

const enterHover = e => {
  e.preventDefault();
  let li = e.target.closest('li');
  let slider = document.querySelector('.carousel__slider');
  li.classList.add('is-open');
  if (li.classList.contains('last-slide')) slider.classList.add('last__slide');

  slider.classList.add('open-now');
  console.log(e.target);
};

const leaveHover = e => {
  e.preventDefault();
  let slider = document.querySelector('.carousel__slider');
  e.target.closest('li').classList.remove('is-open');
  slider.classList.remove('open-now');
  slider.classList.remove('last__slide');
  console.log(e.target);
};

const CustomCardSlide = ({
  index,
  image,
  classToAdd,
  callBack,
  header,
  meta
}) => (
  <Slide index={index} className={classToAdd}>
    <div
      className='slide'
      onMouseEnter={enterHover}
      onMouseLeave={leaveHover}
      onClick={callBack}
      style={{ padding: '2px' }}
    >
      {/* <Card fluid {...cardProps} /> */}
      {image}
      {/* {header}
      {meta} */}
    </div>
  </Slide>
);

CustomCardSlide.propTypes = {
  index: PropTypes.number.isRequired
};

export default CustomCardSlide;
