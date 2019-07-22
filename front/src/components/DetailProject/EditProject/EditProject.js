import React from 'react';
import styled, { css } from 'styled-components';
import Title from 'components/Common/Text';
import Button from 'components/Common/Button';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from 'components/Common/Star';
import { HOVER_TYPE, hover } from 'styles/mixins';

const Container = styled.div`
  border-bottom-left-radius: ${props => props.theme.RADIUS};
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  background-color: white;
  overflow: hidden;
`;

const ProjectContainer = styled.div`
  display: grid;
  grid-template-columns: 0.7fr 1.6fr 0.7fr;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  > div:first-child {
    margin: 0;
    padding: 0;
    padding: ${props => props.theme.GAP.MEDIUM};
  }

  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;

const PublicContainer = styled.div``;

const lockBtnStyles = css`
  font-size: 1.3rem;
  border-radius: ${props => props.theme.RADIUS};
  ${props =>
    props.isEditMode
      ? css`
          ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })}
          padding:${props.theme.GAP.SMALL};
          border:1px solid ${props.theme.COLOR.NOT_FOCUSED.BORDER()};
          &:hover {
            color: white;
          }
        `
      : null}
`;

const EditContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const buttonStyles = css`
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: 0;
  & + & {
    border-left: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  }
`;

const EditProject = ({ project, isEditMode, setEditMode, setProject }) => (
  <Container>
    <ProjectContainer>
      <PublicContainer
        onClick={() => setProject(s => ({ ...s, isPublic: !project.isPublic }))}
      >
        <Button
          icon={project.isPublic ? faLockOpen : faLock}
          isEditMode={isEditMode}
          styles={lockBtnStyles}
        />
      </PublicContainer>
      <Title textChangeMode={isEditMode} hideIcon>
        {project.title}
      </Title>
      <Star
        importance={project.importance}
        isEditMode={isEditMode}
        onConfirm={importance => setProject(s => ({ ...s, importance }))}
      />
    </ProjectContainer>
    <EditContainer>
      <Button hoverType={HOVER_TYPE.BACKGROUND_COLOR} styles={buttonStyles}>
        {isEditMode ? '확인' : '삭제'}
      </Button>
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={() => (isEditMode ? setEditMode(false) : setEditMode(true))}
      >
        {isEditMode ? '취소' : '수정'}
      </Button>
    </EditContainer>
  </Container>
);
export default EditProject;
