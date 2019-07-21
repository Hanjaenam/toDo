import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import ToDoListTemplate from 'components/DetailProject/ToDoListTemplate';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './DayPickerCustom';

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
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
      border-top-left-radius: ${props => props.theme.RADIUS};
      transition: ${props => props.theme.TRANSITION};
      &:hover {
        background-color: ${props => props.theme.PRIMARY()};
        color: white;
      }
      &:focus {
        background-color: ${props => props.theme.PRIMARY()};
        color: white;
      }
    }
  }
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  position: absolute;
  left: 0.5rem;
  pointer-events: none;
`;

const EditContainer = styled.div`
  flex: 1;
  margin: 0 ${props => props.theme.GAP.SMALL};
  padding: ${props => props.theme.GAP.SMALL} 0;
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

const btnLargeStyles = css`
  font-size: 1.5rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  border-top-left-radius: 0;
  padding: 0 ${props => props.theme.GAP.MEDIUM};
`;
const btnPlusStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
`;

const ToDoList = ({
  children,
  selectedDay,
  setSelectedDay,
  createToDo,
  deleteManyToDo,
  createToDoList,
  isExistedTodayData,
}) => {
  const titleRef = useRef();
  return (
    <ToDoListTemplate
      calendar={
        <CalendarContainer>
          <DayPickerInput
            onDayChange={day => setSelectedDay(day)}
            value={selectedDay}
            dayPickerProps={{
              todayButton: 'Today',
              months: MONTHS,
              weekdaysLong: WEEKDAYS_LONG,
              weekdaysShort: WEEKDAYS_SHORT,
              modifiers: {
                disabled: [
                  { before: new Date() },
                  isExistedTodayData ? new Date() : undefined,
                ],
              },
            }}
            inputProps={{ readOnly: true }}
          />
          <CalendarIcon icon={faCalendarAlt} />
          <Button
            icon={faPlus}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={createToDoList}
            styles={btnLargeStyles}
          />
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
            styles={btnPlusStyles}
          >
            추가
          </Button>
          <ListEditMenu handleDeleteMany={deleteManyToDo} />
        </EditContainer>
      }
    >
      {children}
    </ToDoListTemplate>
  );
};

ToDoList.propTypes = {
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  deleteManyToDo: PropTypes.func.isRequired,
  createToDoList: PropTypes.func.isRequired,
  isExistedTodayData: PropTypes.bool.isRequired,
};

export default ToDoList;
