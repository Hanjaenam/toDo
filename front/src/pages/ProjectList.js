import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { hover1, inputCss } from 'styles/mixins';
import styled from 'styled-components';
import ProjectList from 'components/ProjectList';
import Header from 'components/common/Header';
import { useProjectFns, useProjectDatas } from 'store/Project';
import axios from 'axios';
import { useStatus } from 'lib/hooks';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  max-width: 300px;
`;

const Input = styled.input`
  font-size: 1rem;
  flex: 1;
  padding: 0.3rem;
  padding-right: 25px;
  border-radius:${props => props.theme.RADIUS};
  outline:none;
  border:none;
  transition:.5s;
  background-color:rgb(210,210,210);
  &:focus{
    background:white;
  }
  /* ${inputCss} */
`;

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  padding:.3rem;
  border-radius: ${props => props.theme.RADIUS};
  color: white;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0 0.5rem;
  ${hover1}
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.span`
  ${hover1}
  color:white;
`;

const SortView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProjectListPage = () => {
  const { loadData } = useProjectFns();
  const projectDatas = useProjectDatas();
  const { loading, failure, end } = useStatus();
  useEffect(() => {
    if (projectDatas === undefined) {
      axios({
        url: '/project/read',
        method: 'get',
      })
        .then(res => {
          loadData({ data: res.data, type: 'project' });
        })
        .catch(error => failure(error))
        .finally(() => end());
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <Header>
        <InputContainer>
          <Input placeholder="project name" />
          <SearchIcon icon={faSearch} />
        </InputContainer>
        <Pagination>
          <Number>1</Number>
        </Pagination>
        <SortView>
          <Icon icon={faStar} />
          <Icon icon={faClock} />
        </SortView>
      </Header>
      {loading ? null : <ProjectList />}
    </>
  );
};
export default ProjectListPage;
