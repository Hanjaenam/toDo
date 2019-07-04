import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrashAlt,
  faPen,
  faTimes,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  background: transparent;
  display: flex;
  position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
  height: 100%;
  width: 1rem !important;
  padding: 0 0.5rem;
  cursor: pointer;
  transition: 0.5s;
  &:hover {
    color: white;
    background: ${props => props.theme.PRIMARY()};
  }
`;
const SelectIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-30%, -40%);
`;

const DataContainer = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding: 0.5rem;
  background: white;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.2s;
  border: 1px solid ${props => props.theme.PRIMARY()};
  transition: 0.5s;
  ${props => {
    if (props.isSelected) {
      return css`
        background: ${props => props.theme.PRIMARY()};
        p {
          color: white;
        }
      `;
    }
    if (!props.isEditMode || props.isMultiMode) {
      return css`
        cursor: pointer;
        &:hover {
          background-color: ${props => props.theme.PRIMARY()};
          p {
            color: white;
          }
        }
        &:active {
          border-color: ${props => props.theme.PRIMARY()};
        }
      `;
    }
  }}
`;
const Title = styled.p`
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: 0.5rem;
  padding-left: 0;
  color: ${props => props.theme.PRIMARY()};
`;
const Date = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${props => props.theme.PRIMARY()};
`;

const InputContainer = styled.div`
  position: relative;
  flex: 1;
`;
const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: 0.5rem;
  padding-left: 0.5rem;
  cursor: auto;
  font-size: 1rem;
  width: 100%;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:focus {
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
const ConfirmIcon = styled(Icon)`
  position: absolute;
  right: 0;
  top: 0%;
  border-top-right-radius: ${props => props.theme.RADIUS};
  border-bottom-right-radius: ${props => props.theme.RADIUS};
`;
const EditContainer = styled.div`
  background: white;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
  border: 1px solid ${props => props.theme.PRIMARY()};
`;

const ToDoCard = ({
  id,
  title,
  createdAt,
  handleDelete,
  changeTitle,
  setChangeTitleMode,
  patchProject,
  isEditMode,
  isMultiMode,
  handleClick,
  isSelected,
  handlePatchKeyUp,
}) => {
  const titleRef = useRef();
  return (
    <Container>
      <DataContainer
        changeTitle={changeTitle}
        onClick={handleClick}
        isSelected={isSelected}
        isEditMode={isEditMode}
        isMultiMode={isMultiMode}
      >
        {isMultiMode && isSelected ? (
          <SelectIcon icon={faCheck} size="2x" />
        ) : null}
        {changeTitle ? (
          <InputContainer>
            <Input
              defaultValue={title}
              autoFocus
              ref={titleRef}
              onKeyUp={e => handlePatchKeyUp(e, titleRef)}
            />
            <ConfirmIcon
              icon={faCheck}
              onClick={() => patchProject(titleRef)}
            />
          </InputContainer>
        ) : (
          <Title>{title}</Title>
        )}
        <Date>{createdAt}</Date>
      </DataContainer>
      {isEditMode && !isMultiMode ? (
        <EditContainer>
          <Icon
            icon={changeTitle ? faTimes : faPen}
            onClick={
              changeTitle
                ? () => setChangeTitleMode(false)
                : () => setChangeTitleMode(true)
            }
          />
          <Icon icon={faTrashAlt} onClick={() => handleDelete(id)} />
        </EditContainer>
      ) : null}
    </Container>
  );
};

ToDoCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  changeTitle: PropTypes.bool.isRequired,
  setChangeTitleMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  patchProject: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handlePatchKeyUp: PropTypes.func.isRequired,
};
export default ToDoCard;
