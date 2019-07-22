import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  &.error {
    background-color: ${props => props.theme.COLOR.DANGER};
  }
  &.success {
    background-color: ${props => props.theme.COLOR.SUCCESS};
  }
  &.error,
  &.success {
    span {
      color: white;
    }
  }
`;
const Text = styled.span``;
const Message = ({ children, className }) => (
  <Container className={className}>
    <Text>{children}</Text>
  </Container>
);
Message.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
};
Message.defaultProps = {
  className: undefined,
};
export default Message;
