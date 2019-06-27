import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Message from 'components/common/Message';

const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    align-items: flex-start;
    height: auto;
  }
  /* width: 100vw; */
  height: 100vh;
  min-height: 576px;
`;

const Container = styled.div`
  width: 500px;
  @media screen and (max-width: ${props => props.theme.breakpoints.small}) {
    width: 100%;
  }
  border-radius: ${props => props.theme.RADIUS};
  text-align: center;
  overflow: hidden;
  text-transform: capitalize;
  background: white;
`;
const MessageContianer = styled.div`
  div {
    padding: 1.5rem;
  }
  border-bottom: 2px solid ${props => props.theme.BACKGROUND[0]};
  &.failure {
    background-color: ${props => props.theme.DANGER};
  }
  &.success {
    background-color: ${props => props.theme.SUCCESS};
  }
  &.failure,
  &.success {
    span {
      color: white;
    }
  }
`;
const MainContainer = styled.div`
  padding: 2rem;
`;
const Main = styled.main`
  display: grid;
  grid-gap: 1rem;
`;
const Label = styled.label`
  margin-bottom: 0.5rem;
  &:nth-child(3),
  &:nth-child(5) {
    margin-top: 1rem;
  }
`;
const Input = styled.input`
  all: unset;
  padding: 1rem;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid rgba(0, 0, 0, 0.2);
  text-align: left;
  text-transform: initial;
  &:focus {
    border-color: ${props => props.theme.PRIMARY};
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  label {
    text-align: left;
  }
`;

const Button = styled.button`
  transition: 0.5s;
  ${props => {
    if (props.facebook) {
      return css`
        border: 2px solid #3b5998;
        color: #3b5998;
        &:hover {
          color: white;
          background-color: #3b5998;
        }
      `;
    }
    if (props.google) {
      return css`
        border: 2px solid #db4437;
        color: #db4437;
        &:hover {
          color: white;
          background-color: #db4437;
        }
      `;
    }
    if (props.naver) {
      return css`
        border: 2px solid #1ec800;
        color: #1ec800;
        &:hover {
          color: white;
          background-color: #1ec800;
        }
      `;
    }
    return css`
      border: 2px solid ${props => props.theme.PRIMARY};
      color: ${props => props.theme.PRIMARY};
      &:hover {
        color: white;
        background-color: ${props => props.theme.PRIMARY};
      }
    `;
  }};
  border-radius: ${props => props.theme.RADIUS};
  padding: 1rem;
`;

const BtnContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const SocialBtnContainer = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  margin-top: 2.5rem;
`;

const LogInTemplate = ({
  type,
  email,
  message,
  password,
  confirmPassword,
  fetch,
  handleKeyUp,
  failure,
}) => (
  <LayOut>
    <Container>
      <MessageContianer>
        <Message className={failure ? 'failure' : ''}>{message}</Message>
      </MessageContianer>
      <MainContainer>
        <Main>
          <InputContainer>
            <Label htmlFor="email">email</Label>
            <Input type="email" id="email" ref={email} autoFocus />
            <Label htmlFor="password">password</Label>
            <Input
              type="password"
              id="password"
              ref={password}
              onKeyUp={handleKeyUp}
            />
            {type === 'register' ? (
              <>
                <Label htmlFor="confirmPassword">confirmPassword</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  ref={confirmPassword}
                  onKeyUp={handleKeyUp}
                />
              </>
            ) : null}
          </InputContainer>
          <BtnContainer>
            <Button onClick={fetch}>
              {type === 'register' ? '확인' : '로그인'}
            </Button>
            <Button as={Link} to={type === 'register' ? '/login' : '/register'}>
              {type === 'register' ? '취소' : '회원가입'}
            </Button>
          </BtnContainer>
        </Main>
        {type === 'register' ? null : (
          <SocialBtnContainer>
            <Button facebook>facebook</Button>
            <Button google>google</Button>
            <Button naver>naver</Button>
          </SocialBtnContainer>
        )}
      </MainContainer>
    </Container>
  </LayOut>
);

LogInTemplate.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  fetch: PropTypes.func.isRequired,
  failure: PropTypes.string,
  email: PropTypes.shape({}).isRequired,
  password: PropTypes.shape({}).isRequired,
  confirmPassword: PropTypes.shape({}).isRequired,
  handleKeyUp: PropTypes.func.isRequired,
};
LogInTemplate.defaultProps = {
  failure: null,
};
export default LogInTemplate;
