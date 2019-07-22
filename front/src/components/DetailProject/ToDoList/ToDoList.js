import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ToDoListTemplate from 'components/DetailProject/ToDoListTemplate';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import moment from 'moment';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;

const CreatedAt = styled.span`
  flex: 1;
  text-align: center;
  padding: ${props => props.theme.GAP.ONE};
  user-select: none;
`;

const EditContainer = styled.div`
  flex: 1;
  margin: ${props => props.theme.GAP.MEDIUM};
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.GAP.SMALL};
`;
const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: ${props => props.theme.GAP.MEDIUM};
  ${inputCss}
`;

const deleteBtnStyles = css`
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: 0;
  border-right: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  border-top-left-radius: ${props => props.theme.RADIUS};
`;

const createBtnStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;

const ToDoList = ({
  children,
  createdAt,
  isPreviousToDo,
  createToDo,
  deleteManyToDo,
  deleteToDoList,
}) => {
  const titleRef = useRef();
  return (
    <ToDoListTemplate
      calendar={
        <CalendarContainer>
          <Button
            // icon={faTrashAlt}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={deleteToDoList}
            styles={deleteBtnStyles}
            noBorder
          >
            삭제
          </Button>
          <CreatedAt>{moment(createdAt).format('YYYY-MM-DD')}</CreatedAt>
          <ListEditMenu handleDeleteMany={deleteManyToDo} page="toDoList" />
        </CalendarContainer>
      }
      edit={
        isPreviousToDo() ? null : (
          <EditContainer>
            <Input
              type="text"
              maxLength="100"
              placeholder="해야 할 일"
              ref={titleRef}
              onKeyUp={e => {
                if (e.keyCode === 13) {
                  createToDo(titleRef);
                }
              }}
            />
            <Button
              hoverType={HOVER_TYPE.BACKGROUND_COLOR}
              onClick={() => createToDo(titleRef)}
              styles={createBtnStyles}
            >
              추가
            </Button>
          </EditContainer>
        )
      }
    >
      {children}
    </ToDoListTemplate>
  );
};

ToDoList.propTypes = {
  createdAt: PropTypes.string,
  isPreviousToDo: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  deleteManyToDo: PropTypes.func.isRequired,
  deleteToDoList: PropTypes.func.isRequired,
};
ToDoList.defaultProps = {
  createdAt: undefined,
};

export default ToDoList;
