import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import ProjectListComponent from 'components/ProjectList';
import HeaderComponent from 'components/Common/Header';
import { useStatus, useOnlyPrivate, usePage } from 'lib/hooks';
import { projectAPI } from 'lib/API';
import ProjectListProvider from 'store/ProjectList';
import { useUser } from 'store/User';
import queryString from 'query-string';

const ProjectListPage = ({
  history,
  match: { path },
  location: { search },
}) => {
  const user = useUser();
  const startRender = useOnlyPrivate({ user, history });
  const [projectList, setProjectList] = useState();
  const [expandSearch, setExpandSearch] = useState(false);
  const { SORT, sort, setSort, page, setPage } = usePage();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (!startRender) return;
    // 이거 넣으면 sort안됩니다.
    // if (projectList !== undefined) return;
    if (path.includes('/search')) {
      const { term } = queryString.parse(search);
      projectAPI
        .search({ term })
        .then(res => {
          const { headers, data } = res;
          // setPage(s => ({
          //   ...s,
          //   totalPage: headers['last-page'],
          //   dataLimit: headers['data-limit'],
          // }));
          setProjectList(data);
        })
        .catch(err => failure(err));
    } else {
      projectAPI
        .readAll({ sort, page: page.current })
        .then(res => {
          const { headers, data } = res;
          setPage(s => ({
            ...s,
            totalPage: headers['last-page'],
            dataLimit: headers['data-limit'],
          }));
          setProjectList(data);
        })
        .catch(err => failure(err));
    }
  }, [sort, startRender, search]);

  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <ProjectListProvider
        value={{
          projectList,
          sort,
          expandSearch,
          page,
          SORT,
          fns: {
            setProjectList,
            setSort,
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
