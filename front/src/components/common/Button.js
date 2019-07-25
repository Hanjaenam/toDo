import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { activeStyles, hover, HOVER_TYPE } from 'styles/mixins';

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  ${({ active, ...rest }) =>
    active === 'true'
      ? activeStyles({
          type: rest.hovertype ? rest.hovertype : HOVER_TYPE.BACKGROUND_COLOR,
          ...rest.hoveropts,
        })
      : null};
  ${({ disabled, ...rest }) =>
    hover({
      disabled,
      type: rest.hovertype ? rest.hovertype : HOVER_TYPE.BACKGROUND_COLOR,
      ...rest.hoveropts,
    })}
  ${props => props.styles}
`;

const Icon = styled(FontAwesomeIcon)`
  & + p {
    margin-left: ${props => props.theme.GAP.SMALL};
  }
`;

const Text = styled.p``;

const Button = ({
  active,
  children,
  disabled,
  icon,
  onClick,
  styles,
  to,
  ...rest
}) => (
  <Btn
    active={active.toString()}
    as={to && !disabled ? NavLink : 'button'}
    disabled={disabled}
    onClick={disabled ? () => null : onClick}
    styles={styles}
    to={to}
    {...rest}
  >
    {icon ? <Icon icon={icon} /> : null}
    {children ? <Text>{children}</Text> : null}
  </Btn>
);

Button.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  icon: PropTypes.shape({}),
  onClick: PropTypes.func,
  styles: PropTypes.array,
  to: PropTypes.string,
};

Button.defaultProps = {
  active: false,
  children: undefined,
  disabled: false,
  icon: undefined,
  onClick: undefined,
  styles: undefined,
  to: undefined,
};
export default Button;
