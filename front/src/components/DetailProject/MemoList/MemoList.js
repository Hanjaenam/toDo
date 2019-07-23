import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE, memoBackgroundColor } from 'styles/mixins';
import Button from 'components/Common/Button';

const Container = styled.div`
  grid-column: 1 / span 2;
  padding: ${props => props.theme.GAP.SMALL};
`;
const EditContainer = styled.div`
  font-size: 1rem;
  display: flex;
`;
const Textarea = styled.textarea`
  flex: 1;
  font-size: 1rem;
  padding: ${props => props.theme.GAP.SMALL};
  padding-right: 25px;
  word-break: break-all;
  ${memoBackgroundColor}
`;

const buttonStyles = css`
  padding: 0 ${props => props.theme.GAP.MEDIUM};
`;
const MemoList = ({ children, createMemo }) => {
  const contentRef = useRef();
  return (
    <Container className="memo-list">
      {children}
      <EditContainer>
        <Textarea ref={contentRef} placeholder="메모" />
        <Button
          icon={faPlus}
          hoverType={HOVER_TYPE.BACKGROUND_COLOR}
          onClick={() => createMemo(contentRef)}
          styles={buttonStyles}
        />
      </EditContainer>
    </Container>
  );
};

MemoList.propTypes = {
  createMemo: PropTypes.func.isRequired,
};
export default MemoList;
