import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Element = styled.div`
  ${props => (props.init ? null : css``)}
`;

// eslint-disable-next-line no-underscore-dangle
const _Button = ({
  init = false,
  handleClick,
  to,
  children,
  disabled,
  ...rest
}) => {
  return (
    <Element
      disabled={disabled}
      as={to ? Link : 'button'}
      onClick={disabled ? null : handleClick}
      to={to}
      init={init}
      {...rest}
    >
      {children}
    </Element>
  );
};
_Button.propTypes = {
  init: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  to: PropTypes.string,
  disabled: PropTypes.bool,
};
_Button.defaultProps = {
  to: undefined,
  disabled: undefined,
};

export default _Button;
