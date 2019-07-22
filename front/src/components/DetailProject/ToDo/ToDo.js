import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Title from 'components/Common/Text';
import EditMenu from 'components/Common/EditMenu';
import { hover, HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';
import MemoList from 'components/DetailProject/MemoList';

const Container = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${props => props.theme.GAP.SMALL};
  grid-auto-flow: row dense;
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
  display: flex;
  flex: 1;
  box-sizing: border-box;
  align-items: center;
  /* 여기서 padding을 주어야 toDo Data 에만 배경색이 적절하게 들어간다.*/
  padding-left: ${props => props.theme.GAP.MEDIUM};
  &.isCompleted {
    background: ${props => props.theme.COLOR.SUCCESS(0.9)};
    div:first-child {
      border-color: white;
      svg {
        display: block;
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
  border: 2px solid ${props => props.theme.COLOR.PRIMARY()};
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
  transform: scale(1.5);
  position: relative;
  top: -0.3rem;
  left: 0.1rem;
`;

const buttonStyles = css`
  /* margin-left: ${props => props.theme.GAP.SMALL}; */
  padding: 0 ${props => props.theme.GAP.LARGE};
`;

const ToDo = ({
  data,
  isEditMode,
  isMultiMode,
  isSelected,
  handleClick,
  deleteToDo,
  patchToDo,
  textChangeMode,
  setTextChangeMode,
  showToDoMemo,
  toggleShowToDoMemo,
}) => (
  <Container showToDoMemo={showToDoMemo}>
    <DataContainer
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      className={`${isSelected ? 'selected' : ''} ${
        data.isCompleted && !isMultiMode ? 'isCompleted' : ''
      }`}
      onClick={handleClick}
    >
      <CheckContainer>
        <CheckIcon icon={faCheck} />
      </CheckContainer>
      <Title textChangeMode={textChangeMode} handlePatch={patchToDo}>
        {data.title}
      </Title>
    </DataContainer>
    <EditMenu
      textChangeMode={textChangeMode}
      setTextChangeMode={setTextChangeMode}
      handleDelete={deleteToDo}
      csstype="toDo"
    />
    {isEditMode ? null : (
      <Button
        icon={showToDoMemo ? faTimes : null}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={toggleShowToDoMemo}
      >
        {data.memo ? data.memo.length : 0}
      </Button>
    )}
    {showToDoMemo ? <MemoList id={data._id} /> : null}
  </Container>
);
ToDo.propTypes = {
  data: PropTypes.shape({
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
  handleClick: PropTypes.func.isRequired,
  deleteToDo: PropTypes.func.isRequired,
  patchToDo: PropTypes.func.isRequired,
  textChangeMode: PropTypes.bool.isRequired,
  setTextChangeMode: PropTypes.func.isRequired,
  showToDoMemo: PropTypes.bool.isRequired,
  toggleShowToDoMemo: PropTypes.func.isRequired,
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
