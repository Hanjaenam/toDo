import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Title from 'components/Common/Text';
import EditMenu from 'components/DetailProject/EditMenu';
import { hover, HOVER_TYPE } from 'styles/mixins';
import MemoList from 'components/DetailProject/MemoList';

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  ${props =>
    props.isMultiMode || props.isEditMode
      ? null
      : css`
          grid-template-columns: 1fr auto;
        `}
  position: relative;
  transition: box-shadow ${props => props.theme.TRANSITION};
  ${props =>
    props.showToDoMemo
      ? css`
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
          border: 2px solid ${props => props.theme.COLOR.PRIMARY()};
          .memo {
            padding: ${props => props.theme.GAP.SMALL};
          }
        `
      : null};
`;

const DataContainer = styled.div`
  flex: 1;
  display: flex;
  box-sizing: border-box;
  align-items: center;
  /* 여기서 padding을 주어야 toDo Data 에만 배경색이 적절하게 들어간다.*/
  padding: 0 ${props => props.theme.GAP.SMALL};
  &.isCompleted {
    background: ${props => props.theme.COLOR.SUCCESS(0.9)};
    div:first-child {
      background: black;
      svg {
        display: block;
        color: white;
      }
    }
  }
  ${props =>
    props.isMultiMode || !props.isEditMode
      ? hover({ type: HOVER_TYPE.TO_DO })
      : null};
  &.selected {
    background-color: ${props => props.theme.COLOR.PRIMARY()};
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
`;

const CheckContainer = styled.div`
  border: 2px solid black;
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  display: none;
  color: black;
  position: relative;
  font-size: 0.9rem;
`;
const MemoNumberContainer = styled.div`
  margin: ${props => props.theme.GAP.SMALL};
`;

const MemoNumber = styled.p`
  color: ${props => props.theme.COLOR.PRIMARY()};
  box-sizing: border-box;
  min-width: calc(1.3rem + 4px);
  height: 100%;
  padding: 0 ${props => props.theme.GAP.TINY};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fefea5;
  border-radius: 2.5px;
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  cursor: pointer;
  transition: ${props => props.theme.TRANSITION};
  &:hover {
    border-color: ${props => props.theme.COLOR.PRIMARY()};
  }
`;

const ToDo = ({
  toDo,
  patchData,
  setTitle,
  isEditMode,
  isMultiMode,
  isSelected,
  completeToDo,
  deleteToDo,
  patchToDo,
  textChangeMode,
  setTextChangeMode,
  showToDoMemo,
  toggleShowToDoMemo,
}) => (
  <Container
    showToDoMemo={showToDoMemo}
    isMultiMode={isMultiMode}
    isEditMode={isEditMode}
  >
    <DataContainer
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      className={`${isSelected ? 'selected' : ''} ${
        toDo.isCompleted ? 'isCompleted' : ''
      }`}
      onClick={completeToDo}
    >
      <CheckContainer>
        <CheckIcon icon={faCheck} />
      </CheckContainer>
      <Title
        textChangeMode={textChangeMode}
        setText={setTitle}
        handlePatch={patchToDo}
      >
        {patchData.title}
      </Title>
    </DataContainer>
    {isEditMode ? null : (
      <MemoNumberContainer
        className="memo-number"
        isCompleted={toDo.isCompleted}
        onClick={toggleShowToDoMemo}
      >
        <MemoNumber>{toDo.memo ? toDo.memo.length : 0}</MemoNumber>
      </MemoNumberContainer>
    )}
    <EditMenu
      textChangeMode={textChangeMode}
      setTextChangeMode={setTextChangeMode}
      handleDelete={deleteToDo}
      csstype="toDo"
    />
    {showToDoMemo ? <MemoList id={toDo._id} /> : null}
  </Container>
);
ToDo.propTypes = {
  toDo: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    isCompleted: PropTypes.bool,
    createdAt: PropTypes.string,
    completedAt: PropTypes.string,
  }),
  isEditMode: PropTypes.bool.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  completeToDo: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  patchToDo: PropTypes.func.isRequired,
  textChangeMode: PropTypes.bool.isRequired,
  setTextChangeMode: PropTypes.func.isRequired,
  showToDoMemo: PropTypes.bool.isRequired,
  toggleShowToDoMemo: PropTypes.func.isRequired,
};
ToDo.defaultProps = {
  toDo: PropTypes.shape({
    content: undefined,
    isCompleted: undefined,
    createdAt: undefined,
    completedAt: undefined,
  }),
};
export default ToDo;
