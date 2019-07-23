import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Title from 'components/Common/Text';
import Button from 'components/Common/Button';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import Star from 'components/Common/Star';
import { HOVER_TYPE, hover } from 'styles/mixins';

const Container = styled.div`
  border-bottom-left-radius: ${props => props.theme.RADIUS};
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  background-color: white;
  overflow: hidden;
  ${props => props.styles}
`;

const ProjectContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 0.75fr 1.5fr 0.75fr;
  padding: ${props => props.theme.GAP.SMALL} 0;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;
const LockBtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: ${props => props.theme.RADIUS};
  ${props =>
    hover({ type: HOVER_TYPE.BACKGROUND_COLOR, disabled: !props.isEditMode })}
  p {
    text-indent: ${props => props.theme.GAP.SMALL};
  }
`;

const lockBtnStyles = css`
  font-size: 1.3rem;
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

const starStyles = css`
  font-size: 1.3rem;
  padding: ${props => props.theme.GAP.MEDIUM};
`;

const EditProject = ({
  project,
  deleteProject,
  patchData,
  setPatchData,
  patchProject,
  setTitle,
  styles,
  init,
}) => (
  <Container styles={styles}>
    <ProjectContainer>
      <LockBtnContainer
        lockIcon
        isEditMode={patchData.isEditMode}
        onClick={
          patchData.isEditMode
            ? () => setPatchData(s => ({ ...s, isPublic: !patchData.isPublic }))
            : undefined
        }
      >
        <Button
          icon={patchData.isPublic ? faLockOpen : faLock}
          styles={lockBtnStyles}
        />
        <p>{patchData.isPublic ? '공개' : '비공개'}</p>
      </LockBtnContainer>
      <Title textChangeMode={patchData.isEditMode} hideIcon setText={setTitle}>
        {project.title}
      </Title>
      <Star
        isEditMode={patchData.isEditMode}
        importance={patchData.importance}
        styles={starStyles}
        setImportance={importance => setPatchData(s => ({ ...s, importance }))}
      />
    </ProjectContainer>
    <EditContainer>
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={patchData.isEditMode ? patchProject : deleteProject}
        hoverOpts={{ noBorder: true }}
      >
        {patchData.isEditMode ? '확인' : '삭제'}
      </Button>
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={
          patchData.isEditMode
            ? init
            : () => setPatchData(s => ({ ...s, isEditMode: true }))
        }
        hoverOpts={{ noBorder: true }}
      >
        {patchData.isEditMode ? '취소' : '수정'}
      </Button>
    </EditContainer>
  </Container>
);

EditProject.propTypes = {
  project: PropTypes.shape({}).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  patchData: PropTypes.shape({}).isRequired,
  setPatchData: PropTypes.func.isRequired,
  patchProject: PropTypes.func.isRequired,
};
export default EditProject;
