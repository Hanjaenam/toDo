import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import LANG, { htmlLang } from 'lib/htmlLanguage';

const Container = styled.div`
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
  <Container
    danger={
      !(
        children === LANG.SIGN_IN[htmlLang] ||
        children === LANG.REGISTER[htmlLang]
      )
    }
  >
    <Text>{children}</Text>
  </Container>
);

Message.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Message;
