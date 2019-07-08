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
import ListEditMenu from 'components/Common/ListEditMenu';

const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  padding-left: 0.5rem;
  font-size: 1.5rem;
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
      <Icon icon={faPlus} onClick={createProject} />
    </AddContainer>
    {/* {isEditMode ? (
      <>
        {isMultiMode ? (
          <Icon icon={faTrashAlt} onClick={handleDeleteMany} />
        ) : null}
        <MultiModeIcon
          icon={faTasks}
          className={isMultiMode ? 'isMultiMode' : null}
          onClick={() => toggleMultiMode()}
        />
        <Icon icon={faTimes} onClick={initMode} />
      </>
    ) : (
      <Icon icon={faEdit} onClick={() => setEditMode(true)} />
    )} */}
    <ListEditMenu
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
      setEditMode={setEditMode}
      handleDeleteMany={handleDeleteMany}
      toggleMultiMode={toggleMultiMode}
      initMode={initMode}
    />
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
