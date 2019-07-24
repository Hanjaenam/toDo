import React from 'react';
import styled from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hover, HOVER_TYPE } from 'styles/mixins';
import { SORT } from 'store/modules/projectList';

const Details = styled.details`
  position: relative;
`;

const Summary = styled.summary`
  &::-webkit-details-marker {
    display: none;
  }
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  border-radius: ${props => props.theme.RADIUS};
  padding: ${props => props.theme.GAP.MEDIUM};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
`;

const DetailsMenu = styled.div`
  position: absolute;
  transform: translateY(0.2rem);
  left: 0;
  z-index: 99;
  border: 1px solid ${props => props.theme.COLOR.PRIMARY()};
  border-radius: ${props => props.theme.RADIUS};
  background-color: white;
`;

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  grid-gap: ${props => props.theme.GAP.SMALL};
  padding: ${props => props.theme.GAP.MEDIUM};
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
`;

const MenuText = styled.p``;

const CheckIcon = styled(FontAwesomeIcon)``;

const SortView = ({ sort, setSort }) => (
  <Details className="details">
    <Summary>
      <p>
        정렬: <span>{sort}</span>
      </p>
    </Summary>
    <DetailsMenu role="menu">
      <MenuContainer role="menuitem" onClick={() => setSort(SORT.LATEST)}>
        <CheckIcon icon={faCheck} />
        <MenuText>최신순</MenuText>
      </MenuContainer>
      <MenuContainer role="menuitem" onClick={() => setSort(SORT.IMPORTANCE)}>
        <CheckIcon icon={faCheck} />
        <MenuText>중요도</MenuText>
      </MenuContainer>
    </DetailsMenu>
  </Details>
);
export default SortView;
