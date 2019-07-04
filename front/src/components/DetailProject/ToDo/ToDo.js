import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faTrashAlt,
  faPen,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { hover1 } from 'styles/mixins';

const Container = styled.div`
  display: flex;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  border-radius: ${props => props.theme.RADIUS};
  ${props => {
    if (props.completed) {
      return css`
        opacity: 0.4;
        background: ${props => props.theme.SUCCESS(0.4)};
        div {
          background: ${props => props.theme.PRIMARY()};
          svg {
            display: block;
          }
        }
      `;
    }
    if (props.completed === false) {
      return css`
        span {
          color: #fb8c00;
        }
        div {
          border-color: #fb8c00;
        }
      `;
    }
  }};
`;
const CheckIcon = styled(FontAwesomeIcon)`
  display: none;
  color: white;
`;

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  &+& {
    padding-left: 0.5rem;
  }
`;

const CheckContainer = styled.div`
  border: 2px solid ${props => props.theme.PRIMARY()};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  flex: 1;
  font-size: 1rem;
  text-indent: 0.5rem;
  user-select: none;
`;
const ToDo = ({ title, completed }) => (
  <Container completed={completed}>
    <CheckContainer>
      <CheckIcon icon={faCheck} />
    </CheckContainer>
    <Title>{title}</Title>
    {/* <Icon icon={faTimes} /> */}
    <Icon icon={faPen} />
    <Icon icon={faTrashAlt} />
  </Container>
);
ToDo.propTypes = {
  completed: PropTypes.bool,
};
ToDo.defaultProps = {
  completed: undefined,
};
export default ToDo;
