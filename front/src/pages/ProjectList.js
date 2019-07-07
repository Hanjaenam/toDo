import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { hover1 } from 'styles/mixins';
import styled from 'styled-components';
import ProjectList from 'components/ProjectList';
import Header from 'components/Common/Header';
import ProjectListProvider, {
  useProjectListFns,
  useProjectListValues,
} from 'store/ProjectList';
import { useStatus } from 'lib/hooks';
import axios from 'axios';

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  max-width: 300px;
`;

const SearchInput = styled.input`
  font-size: 1rem;
  flex: 1;
  padding: 0.3rem;
  padding-right: 25px;
  border-radius: ${props => props.theme.RADIUS};
  outline: none;
  border: none;
  transition: ${props => props.theme.TRANSITION};
  background-color: rgb(210, 210, 210);
  &:focus {
    background: white;
  }
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
  const { loadProject } = useProjectListFns();
  const { projectDatas } = useProjectListValues();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (projectDatas === undefined) {
      axios({
        url: '/me/project',
        method: 'get',
      })
        .then(res => {
          loadProject(res.data);
        })
        .catch(err => failure(err));
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <Header>
        <InputContainer>
          <SearchInput placeholder="project name" />
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
      {projectDatas === undefined || error ? null : <ProjectList />}
    </>
  );
};
export default () => (
  <ProjectListProvider>
    <ProjectListPage />
  </ProjectListProvider>
);
