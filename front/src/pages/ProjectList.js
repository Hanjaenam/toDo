import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import ProjectListComponent from 'components/ProjectList';
import HeaderComponent from 'components/Common/Header';
import { useStatus, useOnlyPrivate, usePage } from 'lib/hooks';
import { projectAPI } from 'lib/API';
import ProjectListProvider from 'store/ProjectList';
import { useUser } from 'store/User';

const ProjectListPage = ({ history, location }) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  const [projectList, setProjectList] = useState();
  const [expandSearch, setExpandSearch] = useState(false);
  const { page, setPage, init } = usePage();
  const {
    error,
    fns: { failure },
  } = useStatus();

  useEffect(() => {
    if (!userExisted) return;
    projectAPI
      .readAll({ query: location.search })
      .then(res => {
        const { headers, data } = res;
        init({
          total: headers['last-page'],
          limit: headers['page-limit'],
        });
        setProjectList(data);
      })
      .catch(err => failure(err));
  }, [userExisted, location.search]);
  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <ProjectListProvider
        value={{
          projectList,
          expandSearch,
          page,
          fns: {
            setProjectList,
            setExpandSearch,
            setPage,
          },
        }}
      >
        <HeaderComponent />
        {projectList === undefined || error ? null : <ProjectListComponent />}
      </ProjectListProvider>
    </>
  );
};
export default ProjectListPage;
