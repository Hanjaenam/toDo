import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SearchInput = styled.input`
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
  transition: background-color ${props => props.theme.TRANSITION};
  &:focus {
    border-color: ${props => props.theme.PRIMARY()};
    /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05); */
  }
  flex: 1;
  padding: ${props => props.theme.GAP.MEDIUM};
  font-size: 1rem;
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
