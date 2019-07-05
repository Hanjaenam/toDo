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
  border-radius: ${props => props.theme.RADIUS};
  align-items: center;
  transition: ${props => props.theme.TRANSITION};
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
  ${props => {
    if (!props.isEditMode || props.isMultiMode) {
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
      `;
    }
    if (props.isMultiMode && props.isSelected) {
      return css`
        background: ${props.theme.PRIMARY()};
        svg {
          display: block;
        }
      `;
    }
    if (props.isCompleted) {
      return css`
        opacity: 0.4;
        background: ${props.theme.SUCCESS(0.4)};
        div {
          background: ${props.theme.PRIMARY()};
          svg {
            display: block;
          }
        }
      `;
    }
    if (props.isCompleted === false) {
      return css`
        span {
          color: #fb8c00;
        }
        div {
          border-color: #fb8c00;
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
  title,
  isCompleted,
  completedAt,
  isEditMode,
  isMultiMode,
  isChangeTitleMode,
  setChangeTitleMode,
  isSelected,
  handleClick,
}) => (
  <Container>
    <DataContainer
      isCompleted={isCompleted}
      onClick={handleClick}
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      className={`${isSelected ? 'selected' : ''}`}
    >
      <CheckContainer>
        <CheckIcon icon={faCheck} />
      </CheckContainer>
      <Title title={title} isChangeTitleMode={isChangeTitleMode} />
    </DataContainer>
    <EditMenu
      isMultiMode={isMultiMode}
      isEditMode={isEditMode}
      isChangeTitleMode={isChangeTitleMode}
      setChangeTitleMode={setChangeTitleMode}
    />
  </Container>
);
ToDo.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool,
  completedAt: PropTypes.instanceOf(Date),
  isEditMode: PropTypes.bool.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  isChangeTitleMode: PropTypes.bool.isRequired,
  setChangeTitleMode: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
};
ToDo.defaultProps = {
  isCompleted: undefined,
  completedAt: undefined,
};
export default ToDo;
