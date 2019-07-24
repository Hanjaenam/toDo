import { css } from 'styled-components';

export const HOVER_TYPE = {
  BACKGROUND_COLOR: 'backgroundColor',
};

export const hover = ({ type }) => {
  if (type === HOVER_TYPE.BACKGROUND_COLOR) {
    return css`
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.COLOR.PRIMARY()};
        p,
        svg,
        span {
          color: white;
        }
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
