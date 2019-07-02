import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import Project from 'components/Project';
import Header from 'components/common/Header';
import ProjectProvider from 'store/Project/Project';
import { useUser } from 'store/User';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
`;

const ProjectPage = ({
  match: {
    params: { title },
  },
  history,
}) => {
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
        <title>ToDo</title>
      </Helmet>
      {isLogIn ? (
        <Container>
          <Header>
            <Title>{title}</Title>
          </Header>
          <ProjectProvider>
            <Project />
          </ProjectProvider>
        </Container>
      ) : null}
    </>
  );
};
export default ProjectPage;
