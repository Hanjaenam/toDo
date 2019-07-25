import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export default createGlobalStyle`
  ${reset}
  body{
    /* background-color:${props => props.theme.COLOR.BACKGROUND}; */
    font-family: Arial, Helvetica, 'Times New Roman', Times,'Courier New', Courier,Verdana,Georgia,'Trebuchet MS', sans-serif;
  }
  a{
    all:unset;
  }
  p, span,svg{
    color: ${props => props.theme.COLOR.PRIMARY()}
  }
  p, span, label{
    text-transform: capitalize;
  }
  *{
    font-size:1rem;
    box-sizing: border-box;
  }
  button{
    outline:none;
  }
`;
