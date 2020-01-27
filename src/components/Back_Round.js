import React, { useEffect } from 'react';

import desktopImage from '../assets/images/green-grass-field.jpg';
import mobileImage from '../assets/images/background_mobile.png';

const BackRound = () => {
  window.document.body.style.backgroundColor = 'GhostWhite';
  return null;
  // update image as need it
  const handleWindowResize = () => {
    const imageUrl = window.innerWidth >= 650 ? desktopImage : mobileImage;
    window.document.body.style.backgroundImage = `url('${imageUrl}')`;
  };

  // load the large image first
  useEffect(() => {
    handleWindowResize();
  }, []);

  // monitor windwos size chages
  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  return null;
};

export default BackRound;
