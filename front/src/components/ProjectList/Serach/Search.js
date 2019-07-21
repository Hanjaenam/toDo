import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inputCss } from 'styles/mixins';

const SearchInput = styled.input`
  box-sizing: border-box;
  flex: 1;
  padding: ${props => props.theme.GAP.MEDIUM};
  font-size: 1rem;
  ${inputCss}
`;

const Search = ({ expandSearch, searchProject, handleFocus, handleBlur }) => {
  return (
    <SearchInput
      placeholder="프로젝트 검색"
      onKeyUp={e => {
        if (e.keyCode === 13) {
          searchProject(e);
        }
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      expandSearch={expandSearch}
    />
  );
};

Search.propTypes = {
  expandSearch: PropTypes.bool.isRequired,
  searchProject: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Search;
