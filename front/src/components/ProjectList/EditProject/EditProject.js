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
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
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

const EditProject = ({
  titleRef,
  createProject,
  handleCreateKeyUp,
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
        onKeyUp={handleCreateKeyUp}
        maxLength="100"
      />
      <IconContainer>
        <Icon icon={faPlus} onClick={createProject} />
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

EditProject.propTypes = {
  titleRef: PropTypes.shape({}).isRequired,
  createProject: PropTypes.func.isRequired,
  handleCreateKeyUp: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  toggleMultiMode: PropTypes.func.isRequired,
  initMode: PropTypes.func.isRequired,
  handleDeleteMany: PropTypes.func.isRequired,
};

export default EditProject;
