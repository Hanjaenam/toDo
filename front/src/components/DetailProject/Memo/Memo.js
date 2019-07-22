import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faPen, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import moment from 'moment';
import Content from 'components/Common/Text';

const Container = styled.div`
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
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#FFFFA5', endColorstr='#ffffc6',GradientType=1 );
  position: relative;
  padding: ${props => props.theme.GAP.SMALL};
  border: 1px solid #e8e8e8;
  margin-bottom: ${props => props.theme.GAP.SMALL};
`;

const WhoWhenContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Creator = styled.p`
  font-weight: 600;
  margin-right: ${props => props.theme.GAP.MEDIUM};
`;
const CreatedAt = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  color: #9e9e9e;
  margin-right: ${props => props.theme.GAP.MEDIUM};
`;

const ButtonContainer = styled.div`
  position: absolute;
  top: ${props => props.theme.GAP.SMALL};
  right: ${props => props.theme.GAP.SMALL};
  display: flex;
`;

const buttonStyles = css`
  border-radius: 50%;
  padding: ${props => props.theme.GAP.SMALL};
`;

const Memo = ({
  data,
  deleteMemo,
  patchMemo,
  containerRef,
  isEditMode,
  contentChangeMode,
  setContentChangeMode,
}) => {
  return (
    <Container ref={containerRef}>
      <WhoWhenContainer>
        <Creator>{data.creator.email.split('@')[0]}</Creator>
        <CreatedAt>{moment(data.createdAt).fromNow()}</CreatedAt>
      </WhoWhenContainer>
      <Content
        inputAs="textarea"
        textChangeMode={contentChangeMode}
        handlePatch={patchMemo}
      >
        {data.content}
      </Content>
      {isEditMode ? (
        <ButtonContainer>
          <Button
            icon={contentChangeMode ? faTimes : faPen}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            styles={buttonStyles}
            onClick={() =>
              contentChangeMode
                ? setContentChangeMode(false)
                : setContentChangeMode(true)
            }
          />
          <Button
            icon={faTrashAlt}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            styles={buttonStyles}
            onClick={deleteMemo}
          />
        </ButtonContainer>
      ) : null}
    </Container>
  );
};

Memo.propTypes = {
  deleteMemo: PropTypes.func.isRequired,
  patchMemo: PropTypes.func.isRequired,
  containerRef: PropTypes.shape({}).isRequired,
  isEditMode: PropTypes.bool.isRequired,
  contentChangeMode: PropTypes.bool.isRequired,
  setContentChangeMode: PropTypes.func.isRequired,
};
export default Memo;
