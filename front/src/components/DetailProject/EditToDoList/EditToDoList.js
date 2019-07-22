import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import ToDoListTemplate from 'components/DetailProject/ToDoListTemplate';
import moment from 'moment';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  position: relative;
  svg {
    align-self: center;
  }
  .DayPickerInput {
    display: block !important;
    text-align: center;
    flex: 1;
    &:hover {
      & + svg {
        color: white;
      }
      input {
        background-color: ${props => props.theme.COLOR.PRIMARY()};
        color: white;
      }
    }
    input {
      margin-bottom: 0;
      margin-top: 0;
      outline: none;
      box-sizing: border-box;
      font-size: 1em;
      text-align: center;
      font-weight: 400;
      cursor: pointer;
      width: 100%;
      padding: ${props => props.theme.GAP.ONE};
      border: none;
      transition: ${props => props.theme.TRANSITION};
      &:focus {
        background-color: ${props => props.theme.COLOR.PRIMARY()};
        color: white;
      }
    }
  }
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  position: absolute;
  left: 36%;
  pointer-events: none;
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

const createListBtnStyles = css`
  /* font-size: 1.5rem; */
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding: ${props => props.theme.GAP.MEDIUM};
  border-right: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;
const createToDoStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;

const ToDoList = ({
  children,
  selectedDay,
  setSelectedDay,
  createToDo,
  deleteManyToDo,
  createToDoList,
}) => {
  const titleRef = useRef();
  return (
    <ToDoListTemplate
      calendar={
        <CalendarContainer>
          <Button
            // icon={faPlus}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={createToDoList}
            styles={createListBtnStyles}
          >
            추가
          </Button>
          <DayPickerInput
            onDayChange={day => setSelectedDay(day)}
            value={selectedDay}
            dayPickerProps={{
              todayButton: 'Today',
              months: moment()._locale._months,
              weekdaysLong: moment()._locale._weekdays,
              weekdaysShort: moment()._locale._weekdaysMin,
              modifiers: {
                disabled: [{ before: selectedDay }],
              },
            }}
            inputProps={{ readOnly: true }}
          />
          <CalendarIcon icon={faCalendarAlt} />
          <ListEditMenu handleDeleteMany={deleteManyToDo} />
        </CalendarContainer>
      }
      edit={
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
            styles={createToDoStyles}
          >
            추가
          </Button>
        </EditContainer>
      }
    >
      {children}
    </ToDoListTemplate>
  );
};

ToDoList.propTypes = {
  setSelectedDay: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  deleteManyToDo: PropTypes.func.isRequired,
  createToDoList: PropTypes.func.isRequired,
};

export default ToDoList;
