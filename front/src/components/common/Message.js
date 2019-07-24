import React from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  text-transform: capitalize;
  padding: ${props => props.theme.GAP.ONE};
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  ${props =>
    props.danger
      ? css`
          background-color: ${props.theme.COLOR.DANGER};
          p {
            color: white;
          }
        `
      : null}
`;
const Text = styled.p`
  font-size: 1.3rem;
`;
const Message = ({ children }) => (
  <Container danger={!(children === '로그인' || children === '회원가입')}>
    <Text>{children}</Text>
  </Container>
);
export default Message;
