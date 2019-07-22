import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import CONFIG from 'config';
import { useProjectListFns } from 'store/ProjectList';
import SortView from './SortView';

const SortViewContainer = ({ location: { search }, history }) => {
  const { setQuery } = useProjectListFns();
  const hideDetail = e => {
    const {
      target: { offsetParent },
    } = e;
    if (offsetParent && offsetParent.localName === 'details') return;
    document.querySelector('.details').removeAttribute('open');
  };
  useEffect(() => {
    document.addEventListener('click', hideDetail);
    return () => document.removeEventListener('click', hideDetail);
  });
  const getSort = () => queryString.parse(search).sort || CONFIG.SORT.LATEST;
  const setSort = sort => {
    const parsed = queryString.parse(search);
    parsed.sort = sort;
    setQuery(queryString.stringify(parsed));
    // history.push(`/me/project?${queryString.stringify(parsed)}`);
  };
  return <SortView setSort={setSort} sort={getSort()} />;
};
export default withRouter(SortViewContainer);
