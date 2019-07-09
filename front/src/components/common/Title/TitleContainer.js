import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';

const TitleContainer = ({ title, titleChangeMode, processPatch }) => {
  return (
    <Title
      title={title}
      titleChangeMode={titleChangeMode}
      processPatch={processPatch}
    />
  );
};

TitleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  processPatch: PropTypes.func.isRequired,
};
export default TitleContainer;
