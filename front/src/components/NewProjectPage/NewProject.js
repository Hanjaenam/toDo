import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { inputCss } from 'styles/mixins';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import Button from 'components/Common/Button';
import LockButtonContainer from 'containers/NewProjectPage/LockButtonContainer';
import StarButtonContainer from 'containers/Common/StarButtonContainer';

const Text = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

const Container = styled.div`
  display: grid;
  grid-auto-flow: row;
  padding: ${props => props.theme.GAP.ONE};
  grid-gap: 1rem;
`;

const InputContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const Line = styled.hr`
  border: 0;
  border-bottom: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  width: 100%;
  ${props =>
    props.first
      ? css`
          margin-bottom: ${props.theme.GAP.ONE};
        `
      : null}
`;

const Label = styled.label`
  text-indent: ${props => props.theme.GAP.MEDIUM};
`;

const Input = styled.input`
  padding: ${props => props.theme.GAP.ONE};
  border-radius: ${props => props.theme.RADIUS};
  ${inputCss}
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
  justify-content: center;
`;

const StarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
  p {
    margin-right: ${props => props.theme.GAP.MEDIUM};
  }
`;

const StarTitle = styled.p``;

const NewProject = ({
  history,
  projectDataTemplate,
  ProjectActions: { createProject, setProjectDataTemplate },
}) => (
  <Container>
    <Text>{LANG.NEW_PROJECT[htmlLang]}</Text>
    <Line first />
    <InputContainer>
      <Label htmlFor="projectName">{LANG.PROJECT_NAME[htmlLang]}</Label>
      <Input
        id="projectName"
        onChange={e => {
          const {
            target: { value },
          } = e;
          setProjectDataTemplate({ type: 'title', value });
        }}
      />
    </InputContainer>
    <Line />
    <LockButtonContainer />
    <Line />
    <StarContainer>
      <StarTitle>{LANG.NEW_PROJECT.IMPORTANCE[htmlLang]}</StarTitle>
      <StarButtonContainer edit />
    </StarContainer>
    <Line />
    <ButtonContainer>
      <Button
        disabled={projectDataTemplate.title === ''}
        onClick={() =>
          createProject(projectDataTemplate).then(({ data }) =>
            history.push(`/me/project/${data.title}`),
          )
        }
      >
        {LANG.CONFIRM[htmlLang]}
      </Button>
      <Button
        onClick={() => {
          history.goBack();
        }}
      >
        {LANG.CANCEL[htmlLang]}
      </Button>
    </ButtonContainer>
  </Container>
);

NewProject.propTypes = {
  history: PropTypes.shape({}).isRequired,
  projectDataTemplate: PropTypes.shape({
    isPublic: PropTypes.bool.isRequired,
    importance: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  ProjectActions: PropTypes.shape({
    createProject: PropTypes.func.isRequired,
    setProjectDataTemplate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(NewProject);
