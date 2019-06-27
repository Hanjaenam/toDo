import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background: white;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const Title = styled.span``;
const Date = styled.span`
  font-style: italic;
  font-size: 0.8rem;
`;
const AddContainer = styled.div`
  background: white;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled(FontAwesomeIcon)`
  cursor: pointer;
`;
const Input = styled.input`
  all: unset;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin-right: 1rem;
  &:focus {
    border-color: ${props => props.theme.PRIMARY};
  }
`;
const ToDoCard = ({
  title = 'test',
  date = '2019.06.23',
  add,
  history,
  addToDo,
  handleEnter,
}) =>
  add ? (
    <AddContainer>
      <Input placeholder="ToDoName" id="addTitle" onKeyUp={handleEnter} />
      <Icon icon={faPlus} size="2x" onClick={addToDo} />
    </AddContainer>
  ) : (
    <Container onClick={() => history.push('/todo')}>
      <Title>{title}</Title>
      <Date>{date}</Date>
    </Container>
  );

ToDoCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  add: PropTypes.bool,
  history: PropTypes.shape({}).isRequired,
  addToDo: PropTypes.func,
  handleEnter: PropTypes.func,
};
ToDoCard.defaultProps = {
  title: undefined,
  date: undefined,
  add: undefined,
  addToDo: () =>
    console.log('not defined components - Home - ToDoCard - addToDo'),
  handleEnter: () =>
    console.log('not defined componets - Home - ToDoCard - handleEnter'),
};
export default withRouter(ToDoCard);
