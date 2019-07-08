import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Title from 'components/Common/Title';
import EditMenu from 'components/Common/EditMenu';

const Container = styled.div`
  display: flex;
  position: relative;
  & + & {
    margin-top: 0.3rem;
  }
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding-left: 0.5rem;
  align-items: center;
  transition: background-color ${props => props.theme.TRANSITION};
  &.selected {
    background-color: ${props => props.theme.PRIMARY()};
    div:first-child {
      border-color: white;
    }
    p {
      color: white;
    }
    svg {
      display: block;
    }
  }
  &.isCompleted {
    background: ${props => props.theme.SUCCESS(0.9)};
    div:first-child {
      border-color: white;
      svg {
        display: block;
      }
    }
  }
  ${props => {
    if (!props.isCompleted && (props.isMultiMode || !props.isEditMode)) {
      return css`
        cursor: pointer;
        &:hover {
          background-color: ${props => props.theme.PRIMARY()};
          div {
            border-color: white;
          }
          p {
            color: white;
          }
        }
        &:active {
          transform: scale(0.99);
        }
      `;
    }
  }};
`;

const CheckContainer = styled.div`
  border: 2px solid ${props => props.theme.PRIMARY()};
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  display: none;
  color: white;
  font-size: 1rem;
`;

const ToDo = ({
  data,
  isEditMode,
  isMultiMode,
  isSelected,
  isChangeTitleMode,
  setChangeTitleMode,
  handleClick,
  handleDelete,
  processPatch,
}) => (
  <Container>
    <DataContainer
      isCompleted={data.isCompleted}
      onClick={handleClick}
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      className={`${isSelected ? 'selected' : ''} ${
        data.isCompleted ? 'isCompleted' : null
      }`}
    >
      <CheckContainer>
        <CheckIcon icon={faCheck} />
      </CheckContainer>
      <Title
        title={data.title}
        isChangeTitleMode={isChangeTitleMode}
        processPatch={processPatch}
      />
    </DataContainer>
    <EditMenu
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
      handleDelete={handleDelete}
      isCompleted={data.isCompleted}
      cssType="toDo"
    />
  </Container>
);
ToDo.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
    createdAt: PropTypes.string,
    completedAt: PropTypes.string,
  }),
  isEditMode: PropTypes.bool.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  isChangeTitleMode: PropTypes.bool.isRequired,
  setChangeTitleMode: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  processPatch: PropTypes.func.isRequired,
};
ToDo.defaultProps = {
  data: PropTypes.shape({
    content: undefined,
    isCompleted: undefined,
    createdAt: undefined,
    completedAt: undefined,
  }),
};
export default ToDo;
