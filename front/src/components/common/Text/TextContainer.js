import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const TextContainer = ({
  children,
  textChangeMode,
  handlePatch,
  inputAs = 'input',
  hideIcon = false,
  styles,
}) => {
  const isValid = textRef => {
    if (!textRef.current) return false;
    if (textRef.current.value === '') return false;
    return true;
  };
  return (
    <Text
      textChangeMode={textChangeMode}
      handlePatch={handlePatch}
      isValid={isValid}
      inputAs={inputAs}
      styles={styles}
      hideIcon={hideIcon}
    >
      {children}
    </Text>
  );
};

TextContainer.propTypes = {
  children: PropTypes.string.isRequired,
  textChangeMode: PropTypes.bool,
  handlePatch: PropTypes.func,
  inputAs: PropTypes.string,
  hideIcon: PropTypes.bool,
};
TextContainer.defaultProps = {
  textChangeMode: undefined,
  handlePatch: undefined,
  inputAs: undefined,
  hideIcon: undefined,
};
export default TextContainer;
