import React from 'react';
import styled, { css } from 'styled-components';
import { HOVER_TYPE, hover, ACTIVE_STYLES } from 'styles/mixins';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Common/Button';
import CONFIG from 'config';

const Details = styled.details`
  background-color: white;
  position: relative;
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
  border-radius: ${props => props.theme.RADIUS};
  &[open] {
    ${ACTIVE_STYLES.BACKGROUND_COLOR}
  }
`;
const DetailsMenu = styled.div`
  z-index: 1;
  transform: translateY(calc(100%));
  position: absolute;
  bottom: -0.25rem;
  left: 0;
  background: white;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.PRIMARY()};
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);
`;
const Summary = styled.summary`
  outline: none;
  display: flex;
  align-items: center;
  padding: ${props => props.theme.GAP.MEDIUM};
  box-sizing: border-box;
  height: 100%;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  p,
  span {
    color: ${props => props.theme.COLOR.PRIMARY()};
  }
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
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => props.theme.GAP.MEDIUM};
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

const SortView = ({ setSort, sort }) => {
  return (
    <>
      <Details className="details">
        <Summary>
          <p>
            정렬: <span>{CONFIG.SORT.convertKorean(sort)}</span>
          </p>
        </Summary>
        <DetailsMenu role="menu">
          <MenuContainer
            onClick={() => setSort(CONFIG.SORT.LATEST)}
            role="menuitem"
          >
            <CheckIcon
              icon={faCheck}
              show={(sort === CONFIG.SORT.LATEST).toString()}
            />
            <Button type="button" styles={buttonStyles}>
              최신순
            </Button>
          </MenuContainer>
          <MenuContainer
            onClick={() => setSort(CONFIG.SORT.IMPORTANCE)}
            role="menuitem"
          >
            <CheckIcon
              icon={faCheck}
              show={(sort === CONFIG.SORT.IMPORTANCE).toString()}
            />
            <Button type="button" styles={buttonStyles}>
              중요도
            </Button>
          </MenuContainer>
        </DetailsMenu>
      </Details>
    </>
  );
};
export default SortView;
