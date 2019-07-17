import React from 'react';
import { useProjectListValues, useProjectListFns } from 'store/ProjectList';
import Search from './Search';

const SearchContainer = () => {
  const { projectList, expandSearch } = useProjectListValues();
  const { setSearchProject, setExpandSearch } = useProjectListFns();
  const regex = new RegExp();
  const handleKeyUp = e => {
    const {
      target: { value },
    } = e;
    regex.compile(value, 'i');
    setSearchProject({
      regex: value,
      result: projectList.filter(project => regex.test(project.title)),
    });
  };
  const handleFocus = () => {
    setExpandSearch(true);
  };
  const handleBlur = e => {
    setExpandSearch(false);
  };
  return (
    <Search
      expandSearch={expandSearch}
      handleKeyUp={handleKeyUp}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
    />
  );
};

export default SearchContainer;
