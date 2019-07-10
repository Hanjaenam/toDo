import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import moment from 'moment';
import theme from 'styles/theme';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './DayPickerCustom';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.WIDTH.TO_DO_LIST};
  border-radius: ${props => props.theme.RADIUS};
  background: white;
  flex-shrink: 0;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    margin: 0 auto;
    & + & {
      margin-top: ${props => props.theme.PADDING.STANDARD};
    }
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 100%;
  }
  /* 윈도우 화면에서 toDoList 에서 스크롤을 할 수 있게끔 해준 것.*/
  @media screen and (min-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    max-height: 100%;
    display: grid;
    grid-template-rows: auto auto 1fr;
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  ${props =>
    props.edit
      ? css`
          .DayPickerInput {
            display: block !important;
            text-align: center;
            width: 100%;
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
              padding: 1rem;
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
        `
      : null}
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  position: absolute;
  left: 1rem;
  pointer-events: none;
`;

const CreatedAt = styled.span`
  flex: 1;
  text-align: center;
  padding: 1rem;
  user-select: none;
`;

const EditContainer = styled.div`
  flex: 1;
  padding: ${props => props.theme.PADDING.STANDARD};
  display: flex;
  align-items: center;
  ${props =>
    props.isPreviousToDo
      ? css`
          justify-content: flex-end;
        `
      : null}
`;
const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: ${props => props.theme.PADDING.STANDARD};
  ${inputCss}
`;

const DataContainer = styled.div`
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  border-bottom-left-radius: ${props => props.theme.RADIUS};
  /* 여기서 padding을 주면 toDo 배경색이 짤린다.*/
  /* padding-left: 0.5rem; */
  @media screen and (min-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    overflow-y: scroll;
  }
`;
const ToDoList = ({
  children,
  createdAt,
  selectedDay,
  setSelectedDay,
  isPreviousToDo,
  createToDo,
  deleteManyToDo,
  createToDoList,
  deleteToDoList,
  edit,
  isExistedTodayData,
}) => {
  const titleRef = useRef();
  return (
    <Container>
      <CalendarContainer edit={edit}>
        {edit ? (
          <>
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
          </>
        ) : (
          <CreatedAt>{moment(createdAt).format('YYYY-MM-DD')}</CreatedAt>
        )}
        <Button
          icon={edit ? faPlus : faTrashAlt}
          hoverType={HOVER_TYPE.COLOR}
          onClick={edit ? createToDoList : deleteToDoList}
          styles={{
            fontSize: '2.1rem',
            padding: `0 ${theme.PADDING.STANDARD}`,
          }}
        />
      </CalendarContainer>
      <EditContainer isPreviousToDo={isPreviousToDo()}>
        {edit || !isPreviousToDo() ? (
          <>
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
              icon={faPlus}
              hoverType={HOVER_TYPE.COLOR}
              onClick={() => createToDo(titleRef)}
              styles={{
                fontSize: '1.4rem',
                padding: `${theme.PADDING.STANDARD}`,
              }}
            />
          </>
        ) : null}
        <ListEditMenu handleDeleteMany={deleteManyToDo} />
      </EditContainer>
      <DataContainer>{children}</DataContainer>
    </Container>
  );
};

ToDoList.propTypes = {
  createdAt: PropTypes.string,
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  deleteToDoList: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  deleteManyToDo: PropTypes.func.isRequired,
  createToDoList: PropTypes.func.isRequired,
  isPreviousToDo: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  isExistedTodayData: PropTypes.bool.isRequired,
};
ToDoList.defaultProps = {
  createdAt: undefined,
};

export default ToDoList;
