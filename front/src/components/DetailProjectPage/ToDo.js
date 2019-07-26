import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { hover, HOVER_TYPE } from 'styles/mixins';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: ${props => props.theme.GAP.TINY};
  align-items: center;
`;

const DataContainer = styled.div`
  flex: 1;
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  padding: ${props => props.theme.GAP.MEDIUM};
  grid-gap: ${props => props.theme.GAP.SMALL};
  ${props =>
    props.isCompleted
      ? css`
          background-color: ${props => props.theme.COLOR.SUCCESS(0.8)};
          > div {
            color: white;
          }
        `
      : null}
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR, noborder: true })}
`;

const CheckIconContainer = styled.div`
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  font-size: 1rem;
`;

const MemoLength = styled.p`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.GAP.SMALL};
  border-radius: ${props => props.theme.RADIUS};
`;

const Title = styled.p`
  flex: 1;
`;

const CreatedAt = styled.p`
  font-size: ${props => props.theme.FONT_SIZE.CREATED_AT};
`;

const AngleDownContainer = styled.div`
  padding: ${props => props.theme.GAP.MEDIUM};
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
  border: 0;
`;

const AngleDownIcon = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
`;

const ToDo = ({ data, getCreatedAt }) => (
  <Container>
    <DataContainer isCompleted={data.isCompleted}>
      <CheckIconContainer>
        {data.isCompleted ? <CheckIcon icon={faCheck} /> : null}
      </CheckIconContainer>
      <Title>{data.title}</Title>
      <CreatedAt>{getCreatedAt()}</CreatedAt>
      <MemoLength>{data.memo.length}</MemoLength>
    </DataContainer>
    <AngleDownContainer>
      <AngleDownIcon icon={faAngleDown} />
    </AngleDownContainer>
  </Container>
);

ToDo.propTypes = {
  data: PropTypes.shape({
    isCompleted: PropTypes.bool.isRequired,
    memo: PropTypes.shape([]).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  getCreatedAt: PropTypes.func.isRequired,
};

export default ToDo;
