import React from 'react';
import PropTypes from 'prop-types';
import Text from './Text';

const TextContainer = ({
  children,
  textChangeMode,
  handlePatch,
  memo,
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
      memo={memo}
      styles={styles}
    >
      {children}
    </Text>
  );
};

TextContainer.propTypes = {
  children: PropTypes.string.isRequired,
  textChangeMode: PropTypes.bool.isRequired,
  handlePatch: PropTypes.func.isRequired,
  memo: PropTypes.bool,
};
TextContainer.defaultProps = {
  memo: undefined,
};
export default TextContainer;
