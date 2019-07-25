import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProjectListQuery } from 'lib/etc';
import EditProjectContainer from 'containers/ProjectListPage/EditProjectContainer';
import PageTemplate from 'components/Common/PageTemplate';
import ProjectListContainer from 'containers/ProjectListPage/ProjectListContainer';

const ProjectList = ({
  history,
  location: { search },
  page,
  q,
  sort,
  signIn,
}) => {
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    if (!isMount) {
      if (signIn) setMount(true);
      else history.replace('/');
    } else {
      // 처음 마운트될 떄는 history를 조작하지 않도록 한다.
      history.push(getProjectListQuery({ page, q, sort }));
    }
  }, [page, q, sort]);

  return isMount ? (
    <PageTemplate title="할 일들">
      <EditProjectContainer />
      <ProjectListContainer search={search} />
    </PageTemplate>
  ) : null;
};

ProjectList.propTypes = {
  history: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
  page: PropTypes.number.isRequired,
  q: PropTypes.string.isRequired,
  sort: PropTypes.string.isRequired,
  signIn: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    page: state.projectList.getIn(['query', 'page']),
    q: state.projectList.getIn(['query', 'q']),
    sort: state.projectList.getIn(['query', 'sort']),
    signIn: state.user.get('signIn'),
  }),
  null,
)(ProjectList);
