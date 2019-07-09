import React, { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './DayPickerCustom';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.WIDTH.TO_DO_LIST};
  border-radius: ${props => props.theme.RADIUS};
  flex-shrink: 0;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    margin: 0 auto;
    margin-bottom: 1rem;
  }
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
const DataContainer = styled.div`
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  border-bottom-left-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
`;

const EditToDoList = ({
  children,
  selectedDay,
  setSelectedDay,
  createToDo,
  createToDoList,
  handleDeleteMany,
}) => {
  const titleRef = useRef();
  return (
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
        <Button
          icon={faPlus}
          hoverType={HOVER_TYPE.COLOR}
          onClick={createToDoList}
          styles={{ fontSize: '2.1rem', padding: '.5rem' }}
        />
      </Test>
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
          icon={faPlus}
          hoverType={HOVER_TYPE.COLOR}
          onClick={() => createToDo(titleRef)}
          styles={{ fontSize: '1.4rem', paddingLeft: '.5rem' }}
        />
        <ListEditMenu handleDeleteMany={handleDeleteMany} />
      </EditContainer>
      <DataContainer>{children}</DataContainer>
    </Container>
  );
};

EditToDoList.propTypes = {
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  setSelectedDay: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  createToDoList: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default EditToDoList;
