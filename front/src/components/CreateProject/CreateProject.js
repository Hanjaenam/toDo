import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { HOVER_TYPE, inputCss, hover } from 'styles/mixins';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Star from 'components/Common/Star';

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.ONE};
  padding: ${props => props.theme.GAP.MEDIUM};
  text-align: center;
  margin-top: 3vh;
`;
const Column = styled.div`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  ${props =>
    props.center
      ? css`
          justify-content: center;
          grid-gap: ${props => props.theme.GAP.ONE};
        `
      : null}
  ${props =>
    props.hover
      ? css`
          border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
          ${hover({
            type: HOVER_TYPE.BACKGROUND_COLOR,
            active:
              (props.public && props.isPublic) ||
              (props.private && !props.isPublic),
            customActive: css`
              background-color: ${props => props.theme.COLOR.PRIMARY()};
              > p,
              > svg {
                color: white;
              }
            `,
          })};
          &:hover {
            svg {
              color: white;
            }
          }
        `
      : null}
`;

const Row = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.SMALL};
`;

const Input = styled.input`
  /* all: unset; */
  font-size:1rem;
  ${inputCss}
  padding:${props => props.theme.GAP.MEDIUM};
  flex:.8;
  text-align:left;
`;

const buttonStyles = css`
  padding: ${props => props.theme.GAP.MEDIUM};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
`;

const starStyles = css`
  font-size: 1.3rem;
  padding: ${props => props.theme.GAP.MEDIUM};
`;

const Text = styled.p`
  user-select: none;
`;

const Icon = styled(FontAwesomeIcon)`
  transform: scale(1.3);
`;

const CreateProject = ({
  project,
  setProject,
  handleKeyUp,
  createProject,
  cancelCreate,
}) => (
  <Container>
    <Column>
      <Input placeholder="프로젝트 이름" onKeyUp={handleKeyUp} autoFocus />
    </Column>
    <Column center>
      <Text>중요도 :</Text>
      <Star
        isEditMode
        importance={project.importance}
        styles={starStyles}
        setImportance={importance => setProject(s => ({ ...s, importance }))}
      />
    </Column>
    <Row>
      <Column
        center
        hover
        public
        isPublic={project.isPublic}
        onClick={() => setProject(s => ({ ...s, isPublic: true }))}
      >
        <Icon icon={faLockOpen} />
        <Text>이 프로젝트를 공개합니다.</Text>
      </Column>
      <Column
        center
        hover
        private
        isPublic={project.isPublic}
        onClick={() => setProject(s => ({ ...s, isPublic: false }))}
      >
        <Icon icon={faLock} />
        <Text>이 프로젝트를 공개하지 않습니다.</Text>
      </Column>
    </Row>
    <Column center>
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={createProject}
        disabled={project.title === ''}
      >
        추가
      </Button>
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        onClick={cancelCreate}
      >
        취소
      </Button>
    </Column>
  </Container>
);

CreateProject.propTypes = {
  project: PropTypes.shape({}).isRequired,
  setProject: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  cancelCreate: PropTypes.func.isRequired,
};
export default CreateProject;
