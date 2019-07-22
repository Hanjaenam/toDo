import { css } from 'styled-components';

export const HOVER_TYPE = {
  TO_DO: 'toDo',
  BACKGROUND_COLOR: 'backgroundColor',
  COLOR: 'color',
};

export const ACTIVE_STYLES = {
  BACKGROUND_COLOR: css`
    background-color: ${props => props.theme.COLOR.PRIMARY()};
    > p,
    > summary {
      color: white;
    }
  `,
  COLOR: css`
    > p {
      color: ${props => props.theme.COLOR.PRIMARY()};
    }
  `,
};

export const hover = ({ type, disabled, ...opts }) => {
  if (type === HOVER_TYPE.BACKGROUND_COLOR) {
    return css`
      border-radius: ${props => props.theme.RADIUS};
      ${() => {
        if (opts.active) {
          if (opts.customActive) return opts.customActive;
          return ACTIVE_STYLES.BACKGROUND_COLOR;
        }
      }}
      > p {
        user-select: none;
      }
      ${disabled
        ? css`
            background-color: ${props =>
              props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
            > p {
              color: ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
            }
          `
        : css`
            cursor: pointer;
            transition: background-color ${props => props.theme.TRANSITION}
              ${opts.timing ? 'linear' : opts.timing};
            &:hover {
              background-color: ${props =>
                props.theme.COLOR.PRIMARY({
                  add: opts.add,
                  minus: opts.minus,
                })};
              > p,
              > summary {
                color: white;
              }
            }
            &:active {
              > p {
                transform: scale(0.95);
              }
            }
          `}
    `;
  }
  if (type === HOVER_TYPE.COLOR) {
    return css`
      color: rgb(178, 190, 195);
      ${() => (opts.active ? ACTIVE_STYLES.COLOR : null)}
      ${disabled
        ? css`
            background-color: ${props =>
              props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
            > p {
              color: ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
            }
          `
        : css`
            cursor: pointer;
            transition: color ${props => props.theme.TRANSITION}
              ${opts.timing ? 'linear' : opts.timing};
            &:hover {
              color: ${opts.hoverColor
                ? opts.hoverColor
                : props => props.theme.COLOR.PRIMARY()};
            }
            &:active {
              > p {
                transform: scale(0.9);
              }
            }
          `}
    `;
  }
  if (type === HOVER_TYPE.TO_DO) {
    return css`
      ${disabled
        ? css`
            background-color: ${props =>
              props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
            > p {
              color: ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
            }
          `
        : css`
            cursor: pointer;
            transition: background-color ${props => props.theme.TRANSITION};
            &:hover {
              background-color: ${props => props.theme.COLOR.PRIMARY()};
              div {
                border-color: white;
              }
              p {
                color: white;
              }
            }
            &:active {
              transform: scale(0.95);
            }
          `}
    `;
  }
};

export const inputCss = css`
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  background-color:${props => props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
  &:focus{
    background-color:white;
  }
  /* &:focus {
    border-color: ${props => props.theme.COLOR.PRIMARY()};
    box-shadow: 0 0 15px -3px rgba(0, 0, 0, 0.1),
      0 0 6px -2px rgba(0, 0, 0, 0.05);
  } */
`;
