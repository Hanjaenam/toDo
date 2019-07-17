import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';
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
  background: #ffffa5; /* Old browsers */
  background: -moz-linear-gradient(
    -45deg,
    #ffffa5 81%,
    #ffffa5 82%,
    #ffffa5 82%,
    #ffffc6 100%
  ); /* FF3.6+ */
  background: -webkit-gradient(
    linear,
    left top,
    right bottom,
    color-stop(81%, #ffffa5),
    color-stop(82%, #ffffa5),
    color-stop(82%, #ffffa5),
    color-stop(100%, #ffffc6)
  ); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(
    -45deg,
    #ffffa5 81%,
    #ffffa5 82%,
    #ffffa5 82%,
    #ffffc6 100%
  ); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(
    -45deg,
    #ffffa5 81%,
    #ffffa5 82%,
    #ffffa5 82%,
    #ffffc6 100%
  ); /* Opera 11.10+ */
  background: -ms-linear-gradient(
    -45deg,
    #ffffa5 81%,
    #ffffa5 82%,
    #ffffa5 82%,
    #ffffc6 100%
  ); /* IE10+ */
  background: linear-gradient(
    135deg,
    #ffffa5 81%,
    #ffffa5 82%,
    #ffffa5 82%,
    #ffffc6 100%
  ); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FFFFA5', endColorstr='#ffffc6',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
  border: 1px solid #e8e8e8;
`;

const buttonStyles = css`
  padding: 0 ${props => props.theme.GAP.STANDARD};
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
