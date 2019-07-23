import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hover } from 'styles/mixins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Btn = styled.button`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  ${props =>
    hover({
      type: props.hoverType,
      disabled: props.disabled,
      ...props.hoverOpts,
    })}
  ${props => props.styles};
`;

const Icon = styled(FontAwesomeIcon)`
  ${({ styles }) =>
    styles
      ? css`
          font-size: ${styles.fontSize ? styles.fontSize : '1rem'};
        `
      : null}
`;

const Text = styled.p`
  color: ${props => (props.header ? 'white' : props.theme.COLOR.PRIMARY())};
`;

const Button = ({
  children,
  icon,
  hoverType,
  styles,
  hoverOpts,
  onClick,
  disabled,
  header,
  ...rest
}) => (
  <Btn
    {...rest}
    hoverType={hoverType}
    hoverOpts={hoverOpts}
    styles={styles}
    onClick={disabled ? null : onClick}
    disabled={disabled}
  >
    <Text header={header}> {icon ? <Icon icon={icon} /> : children}</Text>
  </Btn>
);

Button.propTypes = {
  icon: PropTypes.shape({}),
  hoverType: PropTypes.string,
  styles: PropTypes.array,
  hoverOpts: PropTypes.shape({}),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  icon: undefined,
  hoverType: undefined,
  styles: undefined,
  hoverOpts: undefined,
  onClick: undefined,
  disabled: undefined,
};
export default Button;
