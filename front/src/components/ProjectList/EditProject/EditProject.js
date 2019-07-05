import React from 'react';
import styled from 'styled-components';
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
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  margin-bottom:.5rem;
  /* border-radius: ${props => props.theme.RADIUS}; */
  /* border-bottom:2px solid ${props => props.theme.PRIMARY()}; */
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
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  ${inputCss}
`;

const AddCard = ({
  titleRef,
  addToDo,
  handleAddKeyUp,
  isEditMode,
  setEditMode,
  isMultiMode,
  toggleMultiMode,
  initMode,
  handleDeleteMany,
}) => (
  <Container>
    <AddContainer>
      <Input
        placeholder="ToDoName"
        id="addTitle"
        ref={titleRef}
        onKeyUp={handleAddKeyUp}
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
          <Icon icon={faTimes} onClick={initMode} />
        </IconContainer>
      </div>
    ) : (
      <IconContainer>
        <Icon icon={faEdit} onClick={() => setEditMode(true)} />
      </IconContainer>
    )}
  </Container>
);

AddCard.propTypes = {
  titleRef: PropTypes.shape({}).isRequired,
  addToDo: PropTypes.func.isRequired,
  handleAddKeyUp: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  toggleMultiMode: PropTypes.func.isRequired,
  initMode: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default AddCard;