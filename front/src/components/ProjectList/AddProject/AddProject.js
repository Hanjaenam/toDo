import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faTasks,
  faEdit,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';
import { hover1, inputCss } from 'styles/mixins';

const Container = styled.div`
  background: white;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.span`
  font-size: 1.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  padding-left: 0.5rem;
`;
const MultiModeIcon = styled(Icon)`
  &.isMultiMode {
    color: ${props => props.theme.PRIMARY()};
  }
`;

const AddContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-right: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
  flex: 1;
  ${inputCss}
`;

const AddCard = ({
  titleRef,
  addToDo,
  handleEnter,
  isEditMode,
  toggleEditMode,
  isMultiMode,
  toggleMultiMode,
  initialize,
  handleDeleteMany,
}) => (
  <Container>
    <AddContainer>
      <Input
        placeholder="ToDoName"
        id="addTitle"
        ref={titleRef}
        onKeyUp={handleEnter}
        maxLength="100"
      />
      <IconContainer>
        <Icon icon={faPlus} onClick={addToDo} />
      </IconContainer>
    </AddContainer>
    {isEditMode ? (
      <div>
        <IconContainer>
          {isMultiMode ? (
            <IconContainer>
              <Icon icon={faTrashAlt} onClick={handleDeleteMany} />
            </IconContainer>
          ) : null}
          <MultiModeIcon
            icon={faTasks}
            className={isMultiMode ? 'isMultiMode' : null}
            onClick={() => toggleMultiMode()}
          />
        </IconContainer>
        <IconContainer>
          <Icon icon={faTimes} onClick={() => initialize()} />
        </IconContainer>
      </div>
    ) : (
      <IconContainer>
        <Icon icon={faEdit} onClick={() => toggleEditMode(true)} />
      </IconContainer>
    )}
  </Container>
);

AddCard.propTypes = {
  titleRef: PropTypes.shape({}).isRequired,
  addToDo: PropTypes.func.isRequired,
  handleEnter: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  toggleEditMode: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  toggleMultiMode: PropTypes.func.isRequired,
  initialize: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default AddCard;
