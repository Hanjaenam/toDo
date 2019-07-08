import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, hover1 } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './DayPickerCustom';

const Container = styled.div`
  box-sizing: border-box;
  width: 450px;
  border-radius: ${props => props.theme.RADIUS};
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    /* height 일부러 안잡아준 것. */
    width: 100%;
    margin-bottom: 0.5rem;
  }
  flex-shrink: 0;
  margin: 1rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;
const Test = styled.div`
  display: flex;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;
const CalendarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  position: relative;
  .DayPickerInput {
    display: block !important;
    text-align: center;
    width: 100%;
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
      &:focus {
        background-color: ${props => props.theme.PRIMARY()};
        color: white;
      }
    }
  }
  &:hover {
    input {
      background-color: ${props => props.theme.PRIMARY()};
      color: white;
    }
    svg {
      color: white;
    }
  }
`;
const CalendarIcon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  position: absolute;
  left: 1rem;
  pointer-events: none;
`;
const Icon = styled(FontAwesomeIcon)`
  font-size: 1.2rem;
  padding-left: 0.5rem;
  ${hover1}
`;
const AddIcon = styled(Icon)`
  font-size: 2.1rem;
  padding: 0.5rem;
`;
const EditContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;
const Input = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  ${inputCss}
`;
const ToDoContainer = styled.div``;

const EditToDoList = ({
  children,
  selectedDay,
  setSelectedDay,
  isEditMode,
  isMultiMode,
  setEditMode,
  toggleMultiMode,
  initMode,
  titleRef,
  createToDo,
  createToDoList,
  handleCreateToDoKeyUp,
  handleDeleteMany,
}) => (
  <Container>
    <Test>
      <CalendarContainer>
        <CalendarIcon icon={faCalendarAlt} />
        <DayPickerInput
          onDayChange={day => setSelectedDay(day)}
          value={selectedDay}
          dayPickerProps={{
            todayButton: 'Today',
            months: MONTHS,
            weekdaysLong: WEEKDAYS_LONG,
            weekdaysShort: WEEKDAYS_SHORT,
          }}
          inputProps={{ readOnly: true }}
        />
      </CalendarContainer>
      <AddIcon icon={faPlus} onClick={createToDoList} />
    </Test>
    <EditContainer>
      <Input
        type="text"
        maxLength="50"
        placeholder="to do title"
        ref={titleRef}
        onKeyUp={handleCreateToDoKeyUp}
      />
      <Icon icon={faPlus} onClick={createToDo} />
      {/* {isEditMode ? (
        <>
          {isMultiMode ? <Icon icon={faTrashAlt} /> : null}
          <Icon icon={faTasks} onClick={() => toggleMultiMode()} />
          <Icon icon={faTimes} onClick={() => initMode()} />
        </>
      ) : (
        <Icon icon={faEdit} onClick={() => setEditMode(true)} />
      )} */}
      <ListEditMenu
        isEditMode={isEditMode}
        isMultiMode={isMultiMode}
        toggleMultiMode={toggleMultiMode}
        setEditMode={setEditMode}
        initMode={initMode}
        handleDeleteMany={handleDeleteMany}
      />
    </EditContainer>
    <ToDoContainer>{children}</ToDoContainer>
  </Container>
);

EditToDoList.propTypes = {
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  titleRef: PropTypes.shape({}).isRequired,
  createToDo: PropTypes.func.isRequired,
  createToDoList: PropTypes.func.isRequired,
  handleCreateToDoKeyUp: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  toggleMultiMode: PropTypes.func.isRequired,
  initMode: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default EditToDoList;
