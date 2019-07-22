import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { HOVER_TYPE, inputCss, hover } from 'styles/mixins';
import { faStar, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
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
  padding: ${props => props.theme.GAP.MEDIUM};
  & + & {
    margin-left: ${props => props.theme.GAP.ONE};
  }
`;

const Text = styled.p`
  user-select: none;
`;

const Icon = styled(FontAwesomeIcon)`
  transform: scale(1.3);
`;

const CreateProject = ({
  data,
  setData,
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
      {/* {new Array(3).fill('').map((_, idx) => (
        <Button
          key={`star_${idx + 1}`}
          className={data.importance >= idx + 1 ? 'selected' : ''}
          icon={faStar}
          hoverType={HOVER_TYPE.COLOR}
          styles={starStyles}
          onClick={() => setData(s => ({ ...s, importance: idx + 1 }))}
        />
      ))} */}
      <Star
        isEditMode
        onConfirm={idx => setData(s => ({ ...s, importance: idx }))}
        styles={starStyles}
      />
    </Column>
    <Row>
      <Column
        center
        hover
        public
        isPublic={data.isPublic}
        onClick={() => setData(s => ({ ...s, isPublic: true }))}
      >
        <Icon icon={faLockOpen} />
        <Text>이 프로젝트를 공개합니다.</Text>
      </Column>
      <Column
        center
        hover
        private
        isPublic={data.isPublic}
        onClick={() => setData(s => ({ ...s, isPublic: false }))}
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
        disabled={data.title === ''}
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
  data: PropTypes.shape({}).isRequired,
  setData: PropTypes.func.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  cancelCreate: PropTypes.func.isRequired,
};
export default CreateProject;
