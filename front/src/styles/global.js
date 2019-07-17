import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}
  body{
    background-color: ${props => props.theme.BACKGROUND[0]};
    font-family: Arial, Helvetica, 'Times New Roman', Times,'Courier New', Courier,Verdana,Georgia,'Trebuchet MS', sans-serif;
  }
  input[type="email"], input[type="password"]{
    outline:none;
  }
  a, button{
    all:unset;
    cursor:pointer
  }
`;
