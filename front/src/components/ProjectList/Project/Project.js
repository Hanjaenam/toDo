import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import EditMenu from 'components/Common/EditMenu';
import Title from 'components/Common/Title';
import moment from 'moment';
import Button from 'components/Common/Button';
import { inputCss, HOVER_TYPE } from 'styles/mixins';
import ListEditMenu from 'components/Common/ListEditMenu';
import theme from 'styles/theme';

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  background: transparent;
  position: relative;
  padding-bottom: ${props => props.theme.PADDING.SMALL};
  ${props =>
    props.edit
      ? css`
          padding: 1rem 0;
          align-items: center;
          justify-content: space-between;
          @media screen and (max-width: ${props =>
              props.theme.BREAKPOINTS.MEDIUM}) {
            padding-left: ${props.theme.PADDING.STANDARD};
            padding-right: ${props.theme.PADDING.STANDARD};
          }
        `
      : null}
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
  padding: ${props => props.theme.PADDING.STANDARD};
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
const EditContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding-right: ${props => props.theme.PADDING.STANDARD};
`;

const Date = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  margin-left: 0.5rem;
  color: ${props => props.theme.PRIMARY()};
`;

const Input = styled.input`
  flex: 1;
  padding: ${props => props.theme.PADDING.STANDARD};
  font-size: 1rem;
  ${inputCss}
`;

const Project = ({
  edit,
  data,
  isEditMode,
  isMultiMode,
  isSelected,
  titleChangeMode,
  setTitleChangeMode,
  createProject,
  deleteProject,
  deleteManyProject,
  patchProject,
  handleClick,
}) => {
  const titleRef = useRef();
  return edit ? (
    <Container edit={edit}>
      <EditContainer>
        <Input
          placeholder="프로젝트 이름"
          id="addTitle"
          ref={titleRef}
          onKeyUp={e => {
            if (e.keyCode === 13) {
              createProject(titleRef);
            }
          }}
          maxLength="100"
        />
        <Button
          icon={faPlus}
          hoverType={HOVER_TYPE.COLOR}
          styles={{
            paddingLeft: `${theme.PADDING.STANDARD}`,
            fontSize: '1.5rem',
          }}
          onClick={() => createProject(titleRef)}
        />
      </EditContainer>
      <ListEditMenu handleDeleteMany={deleteManyProject} />
    </Container>
  ) : (
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
          handlePatch={patchProject}
        />
        <Date>{moment(data.createdAt).format('YYYY-MM-DD')}</Date>
      </DataContainer>
      <EditMenu
        titleChangeMode={titleChangeMode}
        setTitleChangeMode={setTitleChangeMode}
        handleDelete={deleteProject}
      />
    </Container>
  );
};

Project.propTypes = {
  edit: PropTypes.bool,
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  isEditMode: PropTypes.bool.isRequired,
  isMultiMode: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  setTitleChangeMode: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  deleteManyProject: PropTypes.func.isRequired,
  patchProject: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Project.defaultProps = {
  edit: undefined,
  data: undefined,
};
export default Project;
