import React, { useState, useEffect } from 'react';
import ProjectListComponent from 'components/ProjectList';
import Header from 'components/Common/Header';
import { useStatus, useOnlyPrivate, usePage } from 'lib/hooks';
import { projectAPI } from 'lib/API';
import ProjectListProvider from 'store/ProjectList';
import { useUser } from 'store/User';
import PageTemplate from 'components/Common/PageTemplate';
import CONFIG from 'config';

const ProjectListPage = ({ history, location }) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  const [projectList, setProjectList] = useState(null);
  const [expandSearch, setExpandSearch] = useState(false);
  const { page, setPage, init } = usePage();
  const [query, setQuery] = useState(CONFIG.HOME_INIT_QUERY);
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (query === CONFIG.HOME_INIT_QUERY) return;
    history.push(`/me/project?${query}`);
  }, [query]);
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
  return projectList === null || error ? null : (
    <PageTemplate title="할 일 묵록" header={<Header />}>
      <ProjectListProvider
        value={{
          projectList,
          expandSearch,
          page,
          query,
          fns: {
            setProjectList,
            setExpandSearch,
            setPage,
            setQuery,
          },
        }}
      >
        <ProjectListComponent />
      </ProjectListProvider>
    </PageTemplate>
  );
};
export default ProjectListPage;
