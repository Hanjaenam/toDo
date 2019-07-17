import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import styled, { css } from 'styled-components';
import ProjectListComponent from 'components/ProjectList';
import HeaderComponent from 'components/Common/Header';
import { useStatus, useOnlyPrivate } from 'lib/hooks';
import axios from 'axios';
import SearchComponent from 'components/ProjectList/Serach';
import ProjectListProvider from 'store/ProjectList';
import PaginationComponent from 'components/ProjectList/Pagination';
import SortViewComponent from 'components/ProjectList/SortView';
import { useUser } from 'store/User';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  align-items: center;
  transition: width ${props => props.theme.TRANSITION};
`;

const ProjectListPage = ({ history }) => {
  const user = useUser();
  const startRender = useOnlyPrivate({ user, history });
  const SORT = {
    LATEST: 'latest',
    IMPORTANCE: 'importance',
  };
  const [sort, setSort] = useState(SORT.LATEST);
  const [page, setPage] = useState({
    current: 1,
    total: 1,
    dataLimit: undefined,
  });
  const [expandSearch, setExpandSearch] = useState(false);
  const [projectList, setProjectList] = useState();
  const [searchProject, setSearchProject] = useState({
    regex: '',
    result: [],
  });
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (!startRender) return;
    // 이거 넣으면 sort안됩니다.
    // if (projectList !== undefined) return;
    axios({
      url: `/me/project?sort=${sort}&page=${page.current}`,
      method: 'get',
    })
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
  }, [sort, startRender]);

  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <ProjectListProvider
        value={{
          projectList,
          searchProject,
          sort,
          expandSearch,
          page,
          SORT,
          fns: {
            setProjectList,
            setSearchProject,
            setSort,
            setExpandSearch,
            setPage,
          },
        }}
      >
        <HeaderComponent page="projectList">
          <SearchComponent />
          <Container>
            <SortViewComponent />
            <PaginationComponent />
          </Container>
        </HeaderComponent>
        {projectList === undefined || error ? null : <ProjectListComponent />}
      </ProjectListProvider>
    </>
  );
};
export default ProjectListPage;
