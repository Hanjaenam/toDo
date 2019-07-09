import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faStickyNote } from '@fortawesome/free-regular-svg-icons';
import Title from 'components/Common/Title';
import EditMenu from 'components/Common/EditMenu';
import { hover, HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';

const Container = styled.div`
  /* display: flex; */
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr;
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

const ContentContainer = styled.div`
  grid-column: 1 / span 2;
`;

const ToDo = ({
  data,
  isEditMode,
  isMultiMode,
  isSelected,
  handleClick,
  handleDelete,
  processPatch,
  titleChangeMode,
  setTitleChangeMode,
}) => (
  <Container>
    <DataContainer
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      className={`${isSelected ? 'selected' : ''} ${
        data.isCompleted && !isMultiMode ? 'isCompleted' : null
      }`}
      onClick={handleClick}
    >
      <CheckContainer>
        <CheckIcon icon={faCheck} />
      </CheckContainer>
      <Title
        title={data.title}
        titleChangeMode={titleChangeMode}
        processPatch={processPatch}
      />
    </DataContainer>
    <EditMenu
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      handleDelete={handleDelete}
      csstype="toDo"
    />
    {isEditMode ? null : (
      <Button
        icon={faStickyNote}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={{ padding: '0 0.5rem' }}
      />
    )}
    <ContentContainer />
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
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  processPatch: PropTypes.func.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
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
