import React from 'react';
import { useProjectListFns, useProjectListValues } from 'store/ProjectList';
import SortView from './SortView';

const SortViewContainer = () => {
  const { sort, SORT } = useProjectListValues();
  const { setSort } = useProjectListFns();
  return <SortView setSort={setSort} sort={sort} CONST_SORT={SORT} />;
};
export default SortViewContainer;
