import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import EditMenu from 'components/Common/EditMenu';
import Title from 'components/Common/Title';
import moment from 'moment';

const Container = styled.div`
  background: transparent;
  display: flex;
  position: relative;
  padding-bottom: 0.3rem;
`;
const SelectIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(10%, -50%);
`;

const DataContainer = styled.div`
  display: flex;
  flex: 1;
  box-sizing: border-box;
  padding: 0.5rem;
  background: white;
  border-radius: ${props => props.theme.RADIUS};
  justify-content: space-between;
  align-items: center;
  transition: box-shadow ${props => props.theme.TRANSITION};
  border: 1px solid ${props => props.theme.PRIMARY()};
  transition: ${props => props.theme.TRANSITION};
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
      `;
    }
  }}
`;
const Date = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${props => props.theme.PRIMARY()};
`;

const Project = ({
  data,
  handleDelete,
  titleChangeMode,
  setTitleChangeMode,
  processPatch,
  isEditMode,
  isMultiMode,
  handleClick,
  isSelected,
}) => (
  <Container>
    <DataContainer
      onClick={handleClick}
      isSelected={isSelected}
      isEditMode={isEditMode}
      isMultiMode={isMultiMode}
    >
      {isMultiMode && isSelected ? (
        <SelectIcon icon={faCheck} size="2x" />
      ) : null}
      <Title
        title={data.title}
        titleChangeMode={titleChangeMode}
        processPatch={processPatch}
      />
      <Date>{moment(data.createdAt).format('YYYY-MM-DD')}</Date>
    </DataContainer>
    <EditMenu
      titleChangeMode={titleChangeMode}
      setTitleChangeMode={setTitleChangeMode}
      handleDelete={handleDelete}
    />
  </Container>
);

Project.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }).isRequired,
  handleDelete: PropTypes.func.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
  isEditMode: PropTypes.bool.isRequired,
  processPatch: PropTypes.func.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
export default Project;
