import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

const Btn = styled.button`
  text-transform: capitalize;
  text-align: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  border-radius: ${props => props.theme.RADIUS};
  ${props =>
    props.disabled
      ? css`
          background-color: ${props =>
            props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
          p,
          svg {
            color: ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
          }
        `
      : css`
          cursor: pointer;
          &:hover {
            background-color: ${props =>
              props.theme.COLOR.PRIMARY({
                add: props.hoverbgcolor ? props.hoverbgcolor.add : 0,
                minus: props.hoverbgcolor ? props.hoverbgcolor.minus : 0,
              })};
            p,
            svg {
              color: white;
            }
          }
        `}
  ${props => props.styles}
`;
const Text = styled.p``;
const Icon = styled(FontAwesomeIcon)``;
const Button = ({ children, onClick, disabled, icon, styles, to, ...rest }) => (
  <Btn
    as={to && !disabled ? NavLink : 'button'}
    disabled={disabled}
    onClick={disabled ? () => null : onClick}
    styles={styles}
    to={to}
    {...rest}
  >
    {icon ? <Icon icon={icon} /> : <Text>{children}</Text>}
  </Btn>
);
export default Button;
