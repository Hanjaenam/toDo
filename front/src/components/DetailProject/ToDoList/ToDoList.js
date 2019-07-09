import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import ListEditMenu from 'components/Common/ListEditMenu';
import Button from 'components/Common/Button';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.WIDTH.TO_DO_LIST};
  border-radius: ${props => props.theme.RADIUS};
  position: relative;
  flex-shrink: 0;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-right: 1rem;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    margin: 0 auto;
    & + & {
      margin-top: 1rem;
    }
  }
`;

const CalendarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Calendar = styled.span`
  flex: 1;
  text-align: center;
  padding: 1rem;
  user-select: none;
`;

const EditContainer = styled.div`
  flex: 1;
  padding: 0.5rem;
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
  padding: 0.5rem;
  ${inputCss}
`;

const DataContainer = styled.div`
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  border-bottom-left-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
`;
const ToDoList = ({
  children,
  createdAt,
  deleteToDoList,
  createToDo,
  handleDeleteMany,
  checkPreviousToDo,
}) => {
  const titleRef = useRef();
  return (
    <Container>
      <CalendarContainer>
        <Calendar>{moment(createdAt).format('YYYY-MM-DD')}</Calendar>
        <Button
          icon={faTrashAlt}
          hoverType={HOVER_TYPE.COLOR}
          onClick={deleteToDoList}
          styles={{ fontSize: '2.1rem', paddingRight: '.5rem' }}
        />
      </CalendarContainer>
      <EditContainer isPreviousToDo={checkPreviousToDo}>
        {checkPreviousToDo() ? null : (
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
                padding: '.5rem',
                paddingRight: '0',
              }}
            />
          </>
        )}
        <ListEditMenu handleDeleteMany={handleDeleteMany} />
      </EditContainer>
      <DataContainer>{children}</DataContainer>
    </Container>
  );
};

ToDoList.propTypes = {
  createdAt: PropTypes.string.isRequired,
  deleteToDoList: PropTypes.func.isRequired,
  createToDo: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
  checkPreviousToDo: PropTypes.func.isRequired,
};

export default ToDoList;
