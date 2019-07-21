import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import ToDoListTemplate from 'components/DetailProject/ToDoListTemplate';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import moment from 'moment';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
`;

const CreatedAt = styled.span`
  flex: 1;
  text-align: center;
  padding: ${props => props.theme.GAP.ONE};
  user-select: none;
`;

const EditContainer = styled.div`
  flex: 1;
  ${props =>
    props.isPreviousToDo
      ? css`
          display: flex;
          justify-content: flex-end;
        `
      : css`
          margin: 0 ${props => props.theme.GAP.SMALL};
          padding: ${props => props.theme.GAP.SMALL} 0;
          display: grid;
          grid-auto-flow: column;
          grid-template-columns: 1fr;
          grid-gap: ${props => props.theme.GAP.SMALL};
        `}
`;
const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: ${props => props.theme.GAP.MEDIUM};
  ${inputCss}
`;

const btnLargeStyles = css`
  font-size: 1.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding: 0 ${props => props.theme.GAP.MEDIUM};
`;

const btnPlusStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
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
            icon={faTrashAlt}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={deleteToDoList}
            styles={btnLargeStyles}
          />
          <CreatedAt>{moment(createdAt).format('YYYY-MM-DD')}</CreatedAt>
          <ListEditMenu
            handleDeleteMany={deleteManyToDo}
            page="notEditToDoList"
          />
        </CalendarContainer>
      }
      edit={
        isPreviousToDo() ? (
          <EditContainer isPreviousToDo={isPreviousToDo()}>
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
              styles={btnPlusStyles}
            >
              추가
            </Button>
          </EditContainer>
        ) : null
      }
    >
      {children}
    </ToDoListTemplate>
  );
};

ToDoList.propTypes = {
  createdAt: PropTypes.string,

  createToDo: PropTypes.func.isRequired,
  deleteManyToDo: PropTypes.func.isRequired,
  isPreviousToDo: PropTypes.func.isRequired,
};
ToDoList.defaultProps = {
  createdAt: undefined,
};

export default ToDoList;
