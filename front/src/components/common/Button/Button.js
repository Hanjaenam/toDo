import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { hover } from 'styles/mixins';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ${props => hover({ type: props.hoverType, ...props.hoverOpts })};
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
  ${props =>
    props.icon.iconName === 'times'
      ? css`
          font-size: 1.5rem;
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
  ...rest
}) => {
  return (
    <Container
      rest={rest}
      hoverType={hoverType}
      hoverOpts={hoverOpts}
      styles={styles}
      onClick={onClick}
    >
      <p>{icon ? <Icon icon={icon} /> : children}</p>
    </Container>
  );
};

Button.propTypes = {
  icon: PropTypes.shape({}),
  hoverType: PropTypes.string.isRequired,
  styles: PropTypes.shape({}),
  hoverOpts: PropTypes.shape({}),
  onClick: PropTypes.func,
};
Button.defaultProps = {
  icon: undefined,
  styles: undefined,
  hoverOpts: undefined,
  onClick: () => console.log('not defined onClick'),
};
export default Button;
