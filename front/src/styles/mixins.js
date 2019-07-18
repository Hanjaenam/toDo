import { css } from 'styled-components';

export const HOVER_TYPE = {
  TO_DO: 'toDo',
  BACKGROUND_COLOR: 'backgroundColor',
  COLOR: 'color',
};

export const hover = ({ type, ...opts }) => {
  if (type === HOVER_TYPE.BACKGROUND_COLOR) {
    return css`
      cursor: pointer;
      border-radius: ${props => props.theme.RADIUS};
      transition: background-color ${props => props.theme.TRANSITION}
        ${opts.timing ? 'linear' : opts.timing};
      ${props =>
        opts.active
          ? css`
              background-color: ${props.theme.PRIMARY()};
            `
          : null}
      > p {
        user-select: none;
      }
      &:hover {
        background-color: ${props =>
          props.theme.PRIMARY({ add: opts.add, minus: opts.minus })};
        > p {
          color: white;
        }
      }
      &:active {
        > p {
          transform: scale(0.9);
        }
      }
    `;
  }
  if (type === HOVER_TYPE.COLOR) {
    return css`
      cursor: pointer;
      color: rgb(178, 190, 195);
      transition: color ${props => props.theme.TRANSITION}
        ${opts.timing ? 'linear' : opts.timing};
      &:hover {
        color: ${opts.hoverColor
          ? opts.hoverColor
          : props => props.theme.PRIMARY()};
      }
      &:active {
        transform: scale(0.9);
      }
    `;
  }
  if (type === HOVER_TYPE.TO_DO) {
    return css`
      cursor: pointer;
      transition: background-color ${props => props.theme.TRANSITION};
      &:hover {
        background-color: ${props => props.theme.PRIMARY()};
        div {
          border-color: white;
        }
        p {
          color: white;
        }
      }
      &:active {
        transform: scale(0.99);
      }
    `;
  }
};

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
