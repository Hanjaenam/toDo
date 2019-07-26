import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { inputCss } from 'styles/mixins';
import Button from 'components/Common/Button';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import StarButtonContainer from 'containers/Common/StarButtonContainer';

const Container = styled.div`
  z-index: ${props => props.theme.Z_INDEX.NEW_TO_DO.BLACK + 1} !important;
  display: grid;
  grid-auto-flow: row;
  grid-gap: ${props => props.theme.GAP.SMALL};
  align-items: center;
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid ${props => props.theme.COLOR.PRIMARY()};
  position: relative;
  background: white;
`;

const Title = styled.p`
  text-align: center;
  ${props =>
    props.newtodo
      ? css`
          font-size: 1.5rem;
          margin-top: ${props.theme.GAP.LARGE};
        `
      : null}
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
`;

const Label = styled.label`
  text-indent: ${props => props.theme.GAP.MEDIUM};
`;

const Input = styled.input`
  ${inputCss}
  font-size:1rem;
  padding: ${props => props.theme.GAP.MEDIUM};
`;

const MemoTextArea = styled.textarea`
  ${inputCss}
  font-size:1rem;
  padding: ${props => props.theme.GAP.SMALL};
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

const OrderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
  p {
    margin-right: ${props => props.theme.GAP.MEDIUM};
  }
`;

const Black = styled.div`
  background: #000;
  bottom: 0%;
  opacity: 0.6;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: ${props => props.theme.Z_INDEX.NEW_TO_DO.BLACK};
`;

const NumberButtonContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: ${props => props.theme.GAP.SMALL};
`;

const NewToDo = ({
  createToDo,
  projectId,
  toDoDataTemplate: { title, memo, importance, order },
  setIsNewToDo,
  setToDoDataTemplate,
}) => (
  <>
    <Black onClick={() => setIsNewToDo(false)} />
    <Container>
      <Title newtodo>{LANG.NEW_TO_DO[htmlLang]}</Title>
      <Line first />
      <InputContainer>
        <Label htmlFor="tdt">{LANG.TITLE[htmlLang]}</Label>
        <Input
          id="tdt"
          onChange={e => {
            const {
              target: { value },
            } = e;
            setToDoDataTemplate({ type: 'title', value });
          }}
        />
      </InputContainer>
      <Line />
      <InputContainer>
        <Label htmlFor="memo">{LANG.MEMO[htmlLang]}</Label>
        <MemoTextArea
          onChange={e => {
            const {
              target: { value },
            } = e;
            setToDoDataTemplate({ type: 'memo', value });
          }}
        />
      </InputContainer>
      <Line />
      <StarContainer>
        <Title>{LANG.IMPORTANCE[htmlLang]}</Title>
        <StarButtonContainer
          edit
          importance={importance}
          setImportance={value =>
            setToDoDataTemplate({ type: 'importance', value })
          }
        />
      </StarContainer>
      <Line />
      <OrderContainer>
        <Title>{LANG.ORDER[htmlLang]}</Title>
        <NumberButtonContainer>
          {new Array(10).fill('').map((_, idx) => (
            <Button
              active={order === idx + 1}
              key={idx + 1}
              onClick={() =>
                setToDoDataTemplate({ type: 'order', value: idx + 1 })
              }
            >
              {idx + 1}
            </Button>
          ))}
        </NumberButtonContainer>
      </OrderContainer>
      <Line />
      <ButtonContainer>
        <Button
          disabled={title === ''}
          onClick={() =>
            createToDo({
              projectId,
              title,
              memo,
              importance,
              order,
            })
          }
        >
          {LANG.CONFIRM[htmlLang]}
        </Button>
        <Button onClick={() => setIsNewToDo(false)}>
          {LANG.CANCEL[htmlLang]}
        </Button>
      </ButtonContainer>
    </Container>
  </>
);

NewToDo.propTypes = {
  createToDo: PropTypes.func.isRequired,
  projectId: PropTypes.string.isRequired,
  toDoDataTemplate: PropTypes.shape({
    title: PropTypes.string.isRequired,
    memo: PropTypes.string.isRequired,
    importance: PropTypes.number.isRequired,
    order: PropTypes.number,
  }).isRequired,
  setIsNewToDo: PropTypes.func.isRequired,
  setToDoDataTemplate: PropTypes.func.isRequired,
};
export default NewToDo;
