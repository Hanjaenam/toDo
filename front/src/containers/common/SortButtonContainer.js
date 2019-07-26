import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SortButton from 'components/Common/SortButton';

const SortButtonContainer = ({ sort, setSort }) => {
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

  return <SortButton sort={sort} setSort={setSort} />;
};

SortButtonContainer.propTypes = {
  sort: PropTypes.string.isRequired,
  setSort: PropTypes.func,
};

SortButtonContainer.defaultProps = {
  setSort: undefined,
};

export default connect(
  state => ({
    sort: state.projectList.getIn(['query', 'sort']),
  }),
  null,
)(SortButtonContainer);
