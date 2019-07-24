import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getProjectListQuery } from 'lib/etc';
import EditProjectContainer from 'containers/projectList/EditProjectContainer';
import PageTemplateContainer from 'containers/common/PageTemplateContainer';
import ProjectListContainer from 'containers/projectList';

const ProjectList = ({ history, location: { search }, page, q, sort }) => {
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  useEffect(() => {
    if (isMount) {
      history.push(getProjectListQuery({ page, q, sort }));
    }
  }, [page, q, sort]);
  return (
    <PageTemplateContainer title="할 일들">
      <EditProjectContainer />
      <ProjectListContainer locationSearch={search} />
    </PageTemplateContainer>
  );
};

export default connect(
  state => ({
    page: state.projectList.getIn(['query', 'page']),
    q: state.projectList.getIn(['query', 'q']),
    sort: state.projectList.getIn(['query', 'sort']),
  }),
  null,
)(ProjectList);
