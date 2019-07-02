import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { inputCss, hover1 } from 'styles/mixins';
import 'react-day-picker/lib/style.css';
import ToDo from 'components/Project/ToDo';

const Container = styled.div`
  box-sizing: border-box;
  width: 450px;
  border-radius: ${props => props.theme.RADIUS};
  position: relative;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    /*
    height 일부러 안잡아준 것.
    */
    width: 100%;
    margin-bottom: 0.5rem;
  }
  flex-shrink: 0;
  margin-right: 1rem;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const Date = styled.span`
  padding: 1rem;
  user-select: none;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const EditContainer = styled.div`
  padding: 0.5rem;
  display: flex;
`;
const AddContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
`;
const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  ${inputCss}
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  padding: 0.5rem;
  padding-right: 0;
  ${hover1}
`;

const ToDoList = ({
  data,
  createdAt,
  titleRef,
  handleAddClick,
  handleAddKeyUp,
}) => (
  <Container>
    <DateContainer>
      <Date>{createdAt}</Date>
    </DateContainer>
    <EditContainer>
      <AddContainer>
        <Input
          type="text"
          maxLength="50"
          placeholder="to do name"
          ref={titleRef}
          onKeyUp={handleAddKeyUp}
        />
        <Icon icon={faPlus} onClick={handleAddClick} />
      </AddContainer>
    </EditContainer>
    {data.map(todo => (
      <ToDo
        title={todo.title}
        content={todo.content}
        completed={todo.isCompltedAt}
        completedAt={todo.completedAt}
      />
    ))}
  </Container>
);

ToDoList.propTypes = {
  data: PropTypes.shape({}).isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  titleRef: PropTypes.shape({}).isRequired,
  handleAddClick: PropTypes.func.isRequired,
  handleAddKeyUp: PropTypes.func.isRequired,
};

export default ToDoList;
