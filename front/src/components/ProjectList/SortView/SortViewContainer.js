import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import CONFIG from 'config';
import SortView from './SortView';

const SortViewContainer = ({ location: { search }, history }) => {
  const getSort = () => queryString.parse(search).sort || CONFIG.SORT.LATEST;
  const setSort = sort => {
    const parsed = queryString.parse(search);
    parsed.sort = sort;
    history.push(`/me/project?${queryString.stringify(parsed)}`);
  };
  const onClick = e => {
    const { currentTarget } = e;
    currentTarget.classList.add('open');
  };
  return <SortView setSort={setSort} sort={getSort()} onClick={onClick} />;
};
export default withRouter(SortViewContainer);
