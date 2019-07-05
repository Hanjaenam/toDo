import { css } from 'styled-components';

export const hover1 = css`
  cursor: pointer;
  color: rgba(0, 0, 0, 0.4);
  transition: color ${props => props.theme.TRANSITION};
  &:hover {
    color: ${props => props.theme.PRIMARY()};
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const hover2 = css`
  cursor: pointer;
  transition: background-color ${props => props.theme.TRANSITION};
  span {
    user-select: none;
    display: inline-block;
  }
  &:hover {
    background-color: ${props => props.theme.PRIMARY()};
    span {
      color: white;
    }
  }
  &:active {
    span {
      transform: scale(0.9);
    }
  }
`;

export const inputCss = css`
  outline: none;
  border-radius: ${props => props.theme.RADIUS};
  border: 2px solid rgba(0, 0, 0, 0.2);
  transition: ${props => props.theme.TRANSITION};
  &:focus {
    border-color: ${props => props.theme.PRIMARY()};
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;
