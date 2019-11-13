import PropTypes from 'prop-types';
import { Slide } from 'pure-react-carousel';
import React from 'react';
import { Card } from 'semantic-ui-react';

import '../assets/css/slide.css';

const enterHover = e => {
  e.preventDefault();
  let li = e.target.closest('li');
  let slider = document.querySelector('.carousel__slider');
  li.classList.add('is-open');
  if (li.classList.contains('last-slide')) slider.classList.add('last__slide');

  slider.classList.add('open-now');
};

const leaveHover = e => {
  e.preventDefault();
  let slider = document.querySelector('.carousel__slider');
  e.target.closest('li').classList.remove('is-open');
  slider.classList.remove('open-now');
  slider.classList.remove('last__slide');
};

const CustomCardSlide = ({ index, image, classToAdd, callBack }) => (
  <Slide index={index} className={classToAdd}>
    <div
      className='slide'
      onMouseEnter={enterHover}
      onMouseLeave={leaveHover}
      onClick={event => {
        if (document.querySelector('.selectedMovie')) {
          document
            .querySelector('.selectedMovie')
            .classList.remove('selectedMovie');
        }
        event.target.closest('li').classList.add('selectedMovie');
        callBack();
      }}
      style={{ padding: '2px' }}
    >
      {image}
    </div>
  </Slide>
);

CustomCardSlide.propTypes = {
  index: PropTypes.number.isRequired
};

export default CustomCardSlide;
