import React from 'react';
import PropTypes from 'prop-types';
import Title from './Title';

const TitleContainer = ({ title, titleChangeMode, handlePatch }) => {
  return (
    <Title
      title={title}
      titleChangeMode={titleChangeMode}
      handlePatch={handlePatch}
    />
  );
};

TitleContainer.propTypes = {
  title: PropTypes.string.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  handlePatch: PropTypes.func.isRequired,
};
export default TitleContainer;
