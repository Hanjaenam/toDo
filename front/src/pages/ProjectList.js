import React, { useState, useEffect, createContext, useContext } from 'react';
import Helmet from 'react-helmet';
import { faSearch, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';
import styled from 'styled-components';
import ProjectList from 'components/ProjectList';
import Header from 'components/Common/Header';
import { useStatus } from 'lib/hooks';
import axios from 'axios';
import Button from 'components/Common/Button';
import theme from 'styles/theme';

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
  padding: ${props => props.theme.PADDING.SMALL};
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

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SortView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ProjectListContext = createContext();

export const useProjectListValues = () => {
  const { fns, ...values } = useContext(ProjectListContext);
  return values;
};
export const useProjectListFns = () => {
  const { fns } = useContext(ProjectListContext);
  return fns;
};

const ProjectListPage = () => {
  const [projectList, setProjectList] = useState();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (projectList === undefined) {
      axios({
        url: '/me/project',
        method: 'get',
      })
        .then(res => {
          setProjectList(res.data);
        })
        .catch(err => failure(err));
    }
  }, []);
  const buttonStyles = {
    padding: `${theme.PADDING.SMALL}`,
    color: 'white',
  };
  const searchButtonStyles = {
    position: 'absolute',
    right: '0',
    height: '100%',
    padding: `0 ${theme.PADDING.STANDARD}`,
  };
  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      <Header page="projectList">
        <InputContainer>
          <SearchInput placeholder="프로젝트 검색" />
          <Button
            icon={faSearch}
            hoverType={HOVER_TYPE.COLOR}
            styles={searchButtonStyles}
          />
        </InputContainer>
        <Pagination>
          <Button
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            styles={buttonStyles}
            hoverOpts={{ minus: 30 }}
          >
            1
          </Button>
        </Pagination>
        <SortView>
          <Button
            icon={faStar}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            styles={buttonStyles}
            hoverOpts={{ minus: 30 }}
          />
          <Button
            icon={faClock}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            styles={buttonStyles}
            hoverOpts={{ minus: 30 }}
          />
        </SortView>
      </Header>
      {projectList === undefined || error ? null : (
        <ProjectListContext.Provider
          value={{ projectList, fns: { setProjectList } }}
        >
          <ProjectList />
        </ProjectListContext.Provider>
      )}
    </>
  );
};
export default ProjectListPage;
