import React from 'react';
import { withRouter } from 'react-router-dom';
import { useProjectListValues, useProjectListFns } from 'store/ProjectList';
import Search from './Search';

const SearchContainer = ({ history }) => {
  const { expandSearch } = useProjectListValues();
  const { setExpandSearch } = useProjectListFns();
  const searchProject = e => {
    const {
      target: { value },
    } = e;
    history.push(`/me/project/search?term=${value}`);
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

// setSearchProject({
//   regex: value,
//   result: projectList.filter(project => regex.test(project.title)),
// });
