import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { inputCss, hover1 } from 'styles/mixins';
import 'react-day-picker/lib/style.css';
import moment from 'moment';

const Container = styled.div`
  box-sizing: border-box;
  width: 450px;
  border-radius: ${props => props.theme.RADIUS};
  position: relative;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    /*
    height 일부러 안잡아준 것.
    */
    width: 100%;
    margin-bottom: 0.5rem;
  }
  flex-shrink: 0;
  margin: 1rem;
  margin-right: 0;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Date = styled.span`
  flex: 1;
  text-align: center;
  padding: 1rem;
  user-select: none;
`;

const EditContainer = styled.div`
  padding: 0.5rem;
  display: flex;
`;
const AddContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
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

const ToDoListTrashIcon = styled(Icon)`
  font-size: 2.1rem;
  padding-right: 0.5rem;
`;
const ToDoList = ({ children, createdAt, deleteToDoList }) => {
  const titleRef = useRef();
  return (
    <Container>
      <DateContainer>
        <Date>{moment(createdAt).format('YYYY-MM-DD')}</Date>
        <ToDoListTrashIcon icon={faTrashAlt} onClick={deleteToDoList} />
      </DateContainer>
      <EditContainer>
        <AddContainer>
          <Input
            type="text"
            maxLength="50"
            placeholder="to do name"
            ref={titleRef}
            // onKeyUp={handleAddKeyUp}
          />
          {/* <Icon icon={faPlus} onClick={handleAddClick} /> */}
          <Icon icon={faPlus} />
        </AddContainer>
      </EditContainer>
      {children}
    </Container>
  );
};

ToDoList.propTypes = {
  createdAt: PropTypes.string.isRequired,
  deleteToDoList: PropTypes.func.isRequired,
};

export default ToDoList;
