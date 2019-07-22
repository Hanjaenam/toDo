import React from 'react';
import { withRouter } from 'react-router-dom';
import { useProjectListValues, useProjectListFns } from 'store/ProjectList';
import queryString from 'query-string';
import Search from './Search';

const SearchContainer = ({ location: { search }, history }) => {
  const { expandSearch } = useProjectListValues();
  const { setExpandSearch, setQuery } = useProjectListFns();
  const searchProject = e => {
    const {
      target: { value },
    } = e;
    const parsed = queryString.parse(search);
    parsed.q = value;
    setQuery(queryString.stringify(parsed));
    // history.push(`/me/project?${queryString.stringify(parsed)}`);
  };
  const handleFocus = () => {
    setExpandSearch(true);
  };
  const handleBlur = () => {
    setExpandSearch(false);
  };
  return (
    <Search
      expandSearch={expandSearch}
      searchProject={searchProject}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
    />
  );
};

export default withRouter(SearchContainer);
