import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';

const Container = styled.div`
  position: relative;
  flex: 1;
`;
const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: 0.5rem;
  cursor: auto;
  font-size: 1rem;
  width: 100%;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:focus {
    border-color: rgba(0, 0, 0, 0.5);
  }
`;
const TitleText = styled.p`
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: 0.5rem;
  padding-left: 0.3rem;
  color: ${props => props.theme.PRIMARY()};
`;

const Title = ({ title, titleChangeMode, processPatch }) => {
  const titleRef = useRef();
  const buttonStyles = {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    padding: '0 0.5rem',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  };
  return (
    <Container>
      {titleChangeMode ? (
        <>
          <Input
            defaultValue={title}
            autoFocus
            ref={titleRef}
            onKeyUp={e => {
              if (e.keyCode === 13) {
                processPatch(titleRef);
              }
            }}
          />
          <Button
            icon={faCheck}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={() => processPatch(titleRef)}
            styles={buttonStyles}
          />
        </>
      ) : (
        <TitleText>{title}</TitleText>
      )}
    </Container>
  );
};
Title.propTypes = {
  title: PropTypes.string.isRequired,
  titleChangeMode: PropTypes.bool.isRequired,
  processPatch: PropTypes.func,
};
Title.defaultProps = {
  processPatch: undefined,
};
export default Title;
