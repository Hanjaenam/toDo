import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar, faClock } from '@fortawesome/free-solid-svg-icons';
import { hover1, inputCss } from 'styles/mixins';
import styled from 'styled-components';
import ProjectList from 'components/ProjectList';
import Header from 'components/common/Header';
import ProjectListProvider from 'store/ProjectList/ProjectList';
import AddCardProvider from 'store/ProjectList/AddProject';
import { useUser } from 'store/User';

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
  ${inputCss}
`;

const Icon = styled(FontAwesomeIcon)`
  ${hover1}
  padding:.3rem;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  position: absolute;
  right: 0;
  padding: 0.3rem;
  ${hover1}
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Number = styled.span`
  ${hover1}
`;

const SortView = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const ProjectListPage = ({ history }) => {
  const user = useUser();
  const [isLogIn, setLogIn] = useState(false);
  useEffect(() => {
    if (user) {
      setLogIn(true);
    } else {
      history.replace('/');
    }
  }, [user]);
  return (
    <>
      <Helmet>
        <title>할 일 묵록</title>
      </Helmet>
      {isLogIn ? (
        <>
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
          <ProjectListProvider>
            <AddCardProvider>
              <ProjectList />
            </AddCardProvider>
          </ProjectListProvider>
        </>
      ) : null}
    </>
  );
};
export default ProjectListPage;
