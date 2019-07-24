import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getProjectListQuery } from 'lib/etc';
import PropTypes from 'prop-types';
import PageTemplate from 'components/common/PageTemplate';

const PageTemplateContainer = ({
  children,
  history,
  sign,
  query,
  title,
  user,
}) => {
  useEffect(() => {
    if (sign) {
      if (user.data) history.replace(getProjectListQuery(query));
    } else if (!user.data) history.replace('/');
  }, [user]);
  return (
    <PageTemplate sign={sign} title={title}>
      {children}
    </PageTemplate>
  );
};
PageTemplateContainer.propTypes = {
  sign: PropTypes.bool,
  query: PropTypes.shape({
    page: PropTypes.number.isRequired,
    sort: PropTypes.string.isRequired,
    q: PropTypes.string.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({}).isRequired,
};
PageTemplateContainer.defaultProps = {
  sign: false,
};
export default connect(
  state => ({
    user: state.user.toJS(),
    query: state.projectList.get('query').toJS(),
  }),
  null,
)(withRouter(PageTemplateContainer));
