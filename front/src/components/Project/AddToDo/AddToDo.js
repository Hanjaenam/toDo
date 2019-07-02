import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { inputCss, hover1 } from 'styles/mixins';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './DayPickerCustom';

const Container = styled.div`
  box-sizing: border-box;
  width: 450px;
  border-radius: ${props => props.theme.RADIUS};
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

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  position: relative;
  .DayPickerInput {
    display: block !important;
    text-align: center;
    width: 100%;
    input {
      outline: none;
      box-sizing: border-box;
      border-radius: 5px;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      font-size: 1em;
      text-align: center;
      font-weight: 400;
      cursor: pointer;
      width: 100%;
      padding: 1rem;
      border: none;
      transition: 0.5s;
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
const CalendarIcon = styled(Icon)`
  position: absolute;
  left: 1rem;
`;

const ToDo = ({
  selectedDay,
  handleDayChange,
  titleRef,
  handleAddClick,
  handleAddKeyUp,
}) => (
  <Container>
    <DateContainer>
      <CalendarIcon icon={faCalendarAlt} />
      <DayPickerInput
        onDayChange={handleDayChange}
        value={selectedDay}
        dayPickerProps={{
          todayButton: 'Today',
          months: MONTHS,
          weekdaysLong: WEEKDAYS_LONG,
          weekdaysShort: WEEKDAYS_SHORT,
        }}
        inputProps={{ readOnly: true }}
      />
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
  </Container>
);

ToDo.propTypes = {
  selectedDay: PropTypes.instanceOf(Date).isRequired,
  handleDayChange: PropTypes.func.isRequired,
  titleRef: PropTypes.shape({}).isRequired,
  handleAddClick: PropTypes.func.isRequired,
  handleAddKeyUp: PropTypes.func.isRequired,
};

export default ToDo;
