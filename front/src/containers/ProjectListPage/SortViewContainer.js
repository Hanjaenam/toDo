import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setSort } from 'store/modules/projectList';
import SortView from 'components/ProjectListPage/SortView';

const SortViewContainer = ({ sort, setSort }) => {
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

  return <SortView sort={sort} setSort={setSort} />;
};

SortViewContainer.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    sort: state.projectList.getIn(['query', 'sort']),
  }),
  dispatch => ({
    setSort: sort => dispatch(setSort(sort)),
  }),
)(SortViewContainer);
