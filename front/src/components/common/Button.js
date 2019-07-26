import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { activeStyles, hover, ACTIVE_STYLES, HOVER_TYPE } from 'styles/mixins';

const Btn = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  ${({ active, ...rest }) =>
    active === 'true'
      ? activeStyles({
          type: rest.activetype,
          ...rest.activeopts,
        })
      : null};
  ${({ disabled, ...rest }) =>
    hover({
      disabled,
      type: rest.hovertype,
      ...rest.hoveropts,
    })}
  ${props => props.styles}
`;

const Icon = styled(FontAwesomeIcon)`
  & + p {
    margin-left: ${props => props.theme.GAP.SMALL};
  }
`;

const Text = styled.span``;

const Button = ({
  active,
  activetype,
  activeopts,
  children,
  disabled,
  hovertype,
  hoveropts,
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
    hovertype={hovertype}
    hovertops={hoveropts}
    activetype={activetype}
    activeopts={activeopts}
    {...rest}
  >
    {icon ? <Icon icon={icon} /> : null}
    {children ? <Text>{children}</Text> : null}
  </Btn>
);

Button.propTypes = {
  active: PropTypes.bool,
  activetype: PropTypes.string,
  activeopts: PropTypes.shape({}),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  disabled: PropTypes.bool,
  hovertype: PropTypes.string,
  hoveropts: PropTypes.shape({}),
  icon: PropTypes.shape({}),
  onClick: PropTypes.func,
  styles: PropTypes.array,
  to: PropTypes.string,
};

Button.defaultProps = {
  active: false,
  activetype: ACTIVE_STYLES.BACKGROUND_COLOR,
  activeopts: undefined,
  children: undefined,
  disabled: false,
  hovertype: HOVER_TYPE.BACKGROUND_COLOR,
  hoveropts: undefined,
  icon: undefined,
  onClick: undefined,
  styles: undefined,
  to: undefined,
};
export default Button;
