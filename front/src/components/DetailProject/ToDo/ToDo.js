import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import Title from 'components/Common/Text';
import EditMenu from 'components/Common/EditMenu';
import { hover, HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';
import MemoList from 'components/DetailProject/MemoList';

const Container = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr auto;
  grid-auto-flow: row dense;
  position: relative;
  transition: box-shadow ${props => props.theme.TRANSITION};
  ${props =>
    props.showToDoMemo
      ? css`
          box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
          border: 2px solid ${props => props.theme.PRIMARY()};
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
  padding-left: ${props => props.theme.GAP.STANDARD};
  &.isCompleted {
    background: ${props => props.theme.SUCCESS(0.9)};
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

const buttonStyles = css`
  padding: 0 1rem;
  margin-left: 0.2rem;
`;

const ToDo = ({
  data,
  isEditMode,
  isMultiMode,
  isSelected,
  handleClick,
  deleteToDo,
  patchToDo,
  titleChangeMode,
  setTitleChangeMode,
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
      <Title textChangeMode={titleChangeMode} handlePatch={patchToDo}>
        {data.title}
      </Title>
    </DataContainer>
    <EditMenu
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
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
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
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
