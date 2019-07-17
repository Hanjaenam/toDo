import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hover } from 'styles/mixins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.disabled
      ? null
      : hover({ type: props.hoverType, ...props.hoverOpts })}
  ${props => props.styles};
  ${props =>
    props.rest.isMultiMode
      ? css`
          color: ${props => props.theme.PRIMARY()};
        `
      : null};
`;

const Icon = styled(FontAwesomeIcon)`
  ${({ styles }) =>
    styles
      ? css`
          font-size: ${styles.fontSize ? styles.fontSize : '1rem'};
        `
      : null}
`;

const Button = ({
  children,
  icon,
  hoverType,
  styles,
  hoverOpts,
  onClick,
  disabled,
  ...rest
}) => (
  <Container
    rest={rest}
    hoverType={hoverType}
    hoverOpts={hoverOpts}
    styles={styles}
    onClick={disabled ? null : onClick}
    disabled={disabled}
  >
    <p text={children}>{icon ? <Icon icon={icon} /> : children}</p>
  </Container>
);

Button.propTypes = {
  icon: PropTypes.shape({}),
  hoverType: PropTypes.string.isRequired,
  styles: PropTypes.array,
  hoverOpts: PropTypes.shape({}),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
Button.defaultProps = {
  icon: undefined,
  styles: undefined,
  hoverOpts: undefined,
  onClick: () => console.log('not defined onClick'),
  disabled: undefined,
};
export default Button;
