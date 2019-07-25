import { css } from 'styled-components';

export const HOVER_TYPE = {
  BACKGROUND_COLOR: 'backgroundColor',
  COLOR: 'color',
  GITHUB: 'github',
};

export const hover = ({ disabled, type, ...opts }) => {
  if (type === HOVER_TYPE.BACKGROUND_COLOR) {
    return css`
      ${opts.noborder
        ? css`
            border: 0;
          `
        : css`
            border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
            border-radius: ${props => props.theme.RADIUS};
          `}
      ${disabled
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
                  add: opts.add,
                  minus: opts.minus,
                })};
              p,
              svg,
              span {
                color: white;
              }
            }
          `}
    `;
  }
  if (type === HOVER_TYPE.COLOR) {
    return css`
      border: 0;
      ${disabled
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
              p,
              svg,
              span {
                color: ${opts.hovercolor};
              }
            }
          `}
    `;
  }
  if (type === HOVER_TYPE.GITHUB) {
    return css`
      outline: none;
      ${opts.noborder
        ? null
        : css`
            border: 1px solid rgba(27, 31, 35, 0.2);
            border-radius: ${props => props.theme.RADIUS};
          `}
      background-color: #eff3f6;
      background-image: linear-gradient(-180deg, #fafbfc, #eff3f6 90%);
      ${disabled
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
              background-color: #e6ebf1;
              background-image: linear-gradient(-180deg, #f0f3f6, #e6ebf1 90%);
              border-color: rgba(27, 31, 35, 0.35);
            }
            &:active {
              background-color: #e9ecef;
              background-image: none;
              border-color: rgba(27, 31, 35, 0.35);
              box-shadow: inset 0 0.15em 0.3em rgba(27, 31, 35, 0.15);
            }
          `}
    `;
  }
};

export const activeStyles = ({ type, ...opts }) => {
  if (type === HOVER_TYPE.BACKGROUND_COLOR) {
    return css`
      background-color: ${props =>
        props.theme.COLOR.PRIMARY({
          add: opts.add,
          minus: opts.minus,
        })};
      p,
      svg,
      span {
        color: white;
      }
    `;
  }
  if (type === HOVER_TYPE.COLOR) {
    return css`
      p,
      svg,
      span {
        color: ${opts.hovercolor};
      }
    `;
  }
};

export const inputCss = css`
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  background-color: ${props => props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
  &:focus {
    border-color: ${props => props.theme.COLOR.PRIMARY()};
    background-color: white;
  }
`;
