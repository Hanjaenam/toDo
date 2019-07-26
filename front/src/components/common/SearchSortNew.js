import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inputCss } from 'styles/mixins';
import Button from 'components/Common/Button';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import SortButtonContainer from 'containers/Common/SortButtonContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const Input = styled.input`
  font-size: 1rem;
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: ${props => props.theme.RADIUS};
  ${inputCss}
`;

const SearchSortNew = ({
  isNewToDo,
  newButtonText,
  setSearch,
  setSort,
  setIsNewToDo,
  to,
}) => (
  <Container>
    <Input
      placeholder={LANG.SEARCH_PROJECT[htmlLang]}
      onKeyUp={e => {
        const {
          target: { value },
        } = e;
        if (e.keyCode === 13) {
          setSearch(value);
        }
      }}
    />
    <SortButtonContainer setSort={setSort} />
    <Button
      active={isNewToDo}
      activeopts={{ zIndex: 10 }}
      to={to}
      onClick={setIsNewToDo ? () => setIsNewToDo(true) : null}
    >
      {newButtonText}
    </Button>
  </Container>
);

SearchSortNew.propTypes = {
  isNewToDo: PropTypes.bool,
  newButtonText: PropTypes.string.isRequired,
  setSearch: PropTypes.func,
  setSort: PropTypes.func,
  setIsNewToDo: PropTypes.func,
  to: PropTypes.string,
};

SearchSortNew.defaultProps = {
  isNewToDo: undefined,
  setIsNewToDo: undefined,
  setSearch: undefined,
  setSort: undefined,
  to: undefined,
};

export default SearchSortNew;
