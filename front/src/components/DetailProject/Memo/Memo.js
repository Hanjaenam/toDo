import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faPen, faTrashAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE, memoBackgroundColor } from 'styles/mixins';
import moment from 'moment';
import Content from 'components/Common/Text';

const Container = styled.div`
  ${memoBackgroundColor};
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
