import React from 'react';
import styled, { css } from 'styled-components';
import { HOVER_TYPE } from 'styles/mixins';
import { faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { useProjectListValues, useProjectListFns } from 'store/ProjectList';

const Container = styled.div`
  display: flex;
  margin: 0 ${props => props.theme.GAP.STANDARD};
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    margin: 0 ${props => props.theme.GAP.SMALL};
  }
  > div {
    & + div {
      margin-left: ${props => props.theme.GAP.SMALL};
      @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
        margin-left: 0.1rem;
      }
    }
  }
`;
const buttonStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  color: white;
  font-size: 1.1rem;
`;
const latestButtonStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  color: white;
`;
const SortView = () => {
  const { sort, SORT } = useProjectListValues();
  const { setSort } = useProjectListFns();
  return (
    <Container>
      <Button
        icon={faClock}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={latestButtonStyles}
        hoverOpts={{
          minus: 40,
          active: sort === SORT.LATEST,
        }}
        onClick={() => setSort(SORT.LATEST)}
      />
      <Button
        icon={faStar}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        hoverOpts={{ minus: 40, active: sort === SORT.IMPORTANCE }}
        onClick={() => setSort(SORT.IMPORTANCE)}
      />
    </Container>
  );
};
export default SortView;
