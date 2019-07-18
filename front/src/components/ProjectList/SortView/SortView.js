import React from 'react';
import styled, { css } from 'styled-components';
import { HOVER_TYPE, hover } from 'styles/mixins';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Common/Button';

const Container = styled.div`
  display: flex;
  margin: 0 ${props => props.theme.GAP.MEDIUM};
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    margin: 0 ${props => props.theme.GAP.SMALL};
  }
  > div {
    & + div {
      margin-left: ${props => props.theme.GAP.SMALL};
      @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
        margin-left: ${props => props.theme.GAP.TINY};
      }
    }
  }
`;
const Details = styled.details`
  position: relative;
`;
const DetailsMenu = styled.div`
  z-index: 1;
  transform: translateY(calc(100%));
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  border: 1px solid ${props => props.theme.PRIMARY()};
  border-radius: ${props => props.theme.RADIUS};
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
  background: white;
`;
const Summary = styled.summary`
  outline: none;
  display: flex;
  align-items: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  box-sizing: border-box;
  height: 100%;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
  &::-webkit-details-marker {
    display: none;
  }
  span {
    text-transform: capitalize;
  }
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
  &:hover {
    color: white;
  }
`;
const MenuContainer = styled.div`
  padding: ${props => props.theme.GAP.MEDIUM};
  display: flex;
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })}
  border-radius:0;
  &:hover {
    p,
    svg {
      color: white;
    }
  }
`;
const buttonStyles = css`
  flex: 1;
  text-transform: capitalize;
  justify-content: flex-start;
`;

const CheckIcon = styled(FontAwesomeIcon)`
  margin-right: ${props => props.theme.GAP.MEDIUM};
  opacity: 0;
  ${props =>
    props.show === 'true'
      ? css`
          opacity: 1;
        `
      : null}
`;

const SortView = ({ setSort, sort, CONST_SORT }) => {
  return (
    <Container>
      <Details>
        <Summary>
          <p>
            Sort: <span>{sort}</span>
          </p>
        </Summary>
        <DetailsMenu role="menu">
          <MenuContainer>
            <CheckIcon
              icon={faCheck}
              show={(sort === CONST_SORT.LATEST).toString()}
            />
            <Button
              type="button"
              role="menuitem"
              onClick={() => setSort(CONST_SORT.LATEST)}
              styles={buttonStyles}
            >
              {CONST_SORT.LATEST}
            </Button>
          </MenuContainer>
          <MenuContainer>
            <CheckIcon
              icon={faCheck}
              show={(sort === CONST_SORT.IMPORTANCE).toString()}
            />
            <Button
              type="button"
              role="menuitem"
              onClick={() => setSort(CONST_SORT.IMPORTANCE)}
              styles={buttonStyles}
            >
              {CONST_SORT.IMPORTANCE}
            </Button>
          </MenuContainer>
        </DetailsMenu>
      </Details>
    </Container>
  );
};
export default SortView;
