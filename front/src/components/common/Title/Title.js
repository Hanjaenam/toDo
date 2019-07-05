import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
const ConfirmIcon = styled(FontAwesomeIcon)`
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1rem !important;
  padding: 0 0.5rem;
  transition: ${props => props.theme.TRANSITION};
  border-top-right-radius: ${props => props.theme.RADIUS};
  border-bottom-right-radius: ${props => props.theme.RADIUS};
  &:hover {
    color: white;
    background: ${props => props.theme.PRIMARY()};
  }
`;
const TitleText = styled.p`
  box-sizing: border-box;
  border: 2px solid transparent;
  padding: 0.5rem;
  padding-left: 0.3rem;
  color: ${props => props.theme.PRIMARY()};
`;

const Title = ({
  title,
  isChangeTitleMode,
  handlePatchKeyUp,
  patchProject,
}) => {
  const titleRef = useRef();
  return (
    <Container>
      {isChangeTitleMode ? (
        <>
          <Input
            defaultValue={title}
            autoFocus
            ref={titleRef}
            onKeyUp={e => handlePatchKeyUp(e, titleRef)}
          />
          <ConfirmIcon icon={faCheck} onClick={() => patchProject(titleRef)} />
        </>
      ) : (
        <TitleText>{title}</TitleText>
      )}
    </Container>
  );
};
Title.propTypes = {
  title: PropTypes.string.isRequired,
  isChangeTitleMode: PropTypes.bool.isRequired,
  handlePatchKeyUp: PropTypes.func.isRequired,
  patchProject: PropTypes.func.isRequired,
};
export default Title;
