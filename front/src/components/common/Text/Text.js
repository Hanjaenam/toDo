import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';

const Container = styled.div`
  position: relative;
  flex: 1;
  ${props => props.styles}
`;
const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: ${props => props.theme.GAP.STANDARD};
  cursor: auto;
  font-size: 1rem;
  width: 100%;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid rgba(0, 0, 0, 0.2);
  &:focus {
    border-color: rgba(0, 0, 0, 0.5);
  }
  padding-right: 2rem;
`;
const Data = styled.p`
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: ${props => props.theme.GAP.STANDARD};
  padding-left: ${props => props.theme.GAP.SMALL};
  /* color: ${props => props.theme.PRIMARY()}; */
  color:black;
  word-break: break-all;
`;
const buttonStyles = css`
  position: absolute;
  right: 0;
  top: 0%;
  height: 100%;
  padding: 0 ${props => props.theme.GAP.STANDARD};
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
`;

const Text = ({
  children,
  textChangeMode,
  handlePatch,
  isValid,
  memo,
  styles,
}) => {
  const textRef = useRef();
  return (
    <Container styles={styles}>
      {textChangeMode ? (
        <>
          <Input
            as={memo ? 'textarea' : 'input'}
            defaultValue={children}
            autoFocus
            ref={textRef}
            onKeyUp={e => {
              if (!isValid(textRef)) return;
              if (e.keyCode === 13) {
                handlePatch(textRef);
              }
            }}
          />
          <Button
            icon={faCheck}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={() => {
              if (!isValid(textRef)) return;
              handlePatch(textRef);
            }}
            styles={buttonStyles}
          />
        </>
      ) : (
        <Data>{children}</Data>
      )}
    </Container>
  );
};
Text.propTypes = {
  textChangeMode: PropTypes.bool.isRequired,
  handlePatch: PropTypes.func,
  isValid: PropTypes.func.isRequired,
  memo: PropTypes.bool,
};
Text.defaultProps = {
  handlePatch: undefined,
  memo: undefined,
};
export default Text;
