import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import theme from 'styles/theme';

const Container = styled.div`
  position: relative;
  flex: 1;
`;
const Input = styled.input`
  all: unset;
  box-sizing: border-box;
  padding: ${props => props.theme.PADDING.STANDARD};
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
  padding: ${props => props.theme.PADDING.STANDARD};
  padding-left: ${props => props.theme.PADDING.SMALL};
  /* color: ${props => props.theme.PRIMARY()}; */
  color:black;
  word-break: break-all;
`;

const Title = ({ title, titleChangeMode, handlePatch }) => {
  const titleRef = useRef();
  const buttonStyles = {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    padding: `0 ${theme.PADDING.STANDARD}`,
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
                handlePatch(titleRef);
              }
            }}
          />
          <Button
            icon={faCheck}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            onClick={() => handlePatch(titleRef)}
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
  handlePatch: PropTypes.func,
};
Title.defaultProps = {
  processPatch: undefined,
};
export default Title;
