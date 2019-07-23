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
  setText,
}) => {
  const isValid = textRef => {
    if (!textRef.current) return false;
    if (textRef.current.value === '') return false;
    return true;
  };
  const handleChange = e => {
    const {
      target: { value },
    } = e;
    setText(value);
  };
  return (
    <Text
      textChangeMode={textChangeMode}
      handlePatch={handlePatch}
      isValid={isValid}
      inputAs={inputAs}
      styles={styles}
      hideIcon={hideIcon}
      handleChange={handleChange}
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
  setText: PropTypes.func,
};
TextContainer.defaultProps = {
  textChangeMode: undefined,
  handlePatch: undefined,
  inputAs: undefined,
  hideIcon: undefined,
  setText: undefined,
};
export default TextContainer;
