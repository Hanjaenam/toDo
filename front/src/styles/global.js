import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}
  body{
    background-color: ${props => props.theme.BACKGROUND[0]};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  input[type="email"], input[type="password"]{
    outline:none;
  }
  a, button{
    all:unset;
    cursor:pointer
  }
`;
