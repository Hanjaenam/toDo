import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { hover, HOVER_TYPE } from 'styles/mixins';
import LANG, { htmlLang } from 'lib/htmlLanguage';

const Summary = styled.summary`
  &::-webkit-details-marker {
    display: none;
  }
  outline: none;
  padding: ${props => props.theme.GAP.MEDIUM};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
  &:hover {
    span {
      color: white;
    }
  }
`;

const Details = styled.details`
  position: relative;
  border-radius: ${props => props.theme.RADIUS};
  &[open] {
    ${Summary} {
      background-color: ${props => props.theme.COLOR.PRIMARY()};
      span,
      p {
        color: white;
      }
    }
  }
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
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR, noborder: true })};
`;

const MenuText = styled.p``;

const CheckIcon = styled(FontAwesomeIcon)`
  ${props =>
    props.show === 'true'
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0;
        `}
`;

const SortButton = ({ sort, setSort }) => (
  <Details className="details">
    <Summary>
      <p>
        {LANG.SORT[htmlLang]}:{' '}
        <span>{LANG.SORT[sort.toUpperCase()][htmlLang]}</span>
      </p>
    </Summary>
    <DetailsMenu role="menu">
      <MenuContainer role="menuitem" onClick={() => setSort('latest')}>
        <CheckIcon icon={faCheck} show={(sort === 'latest').toString()} />
        <MenuText>{LANG.SORT.LATEST[htmlLang]}</MenuText>
      </MenuContainer>
      <MenuContainer role="menuitem" onClick={() => setSort('importance')}>
        <CheckIcon icon={faCheck} show={(sort === 'importance').toString()} />
        <MenuText>{LANG.SORT.IMPORTANCE[htmlLang]}</MenuText>
      </MenuContainer>
    </DetailsMenu>
  </Details>
);

SortButton.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func,
};

SortButton.defaultProps = {
  setSort: undefined,
};

export default SortButton;
