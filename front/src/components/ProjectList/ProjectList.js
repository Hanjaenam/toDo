import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import EditMenuProvider from 'store/Common/EditMenu';
import EditProject from 'components/ProjectList/EditProject';
import queryString from 'query-string';
import PaginationComponent from 'components/ProjectList/Pagination';

const Container = styled.div`
  box-sizing: border-box;
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  /* margin: ${props => props.theme.GAP.MEDIUM} auto;
  margin-top: 0; */
  margin:0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 95%;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    width: 100%;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  box-sizing: border-box;
  background: transparent;
  position: relative;
  margin-bottom: ${props => props.theme.GAP.ONE};
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 1.2rem;
`;

const ProjectList = ({ children, match: { path }, location: { search } }) => (
  <Container>
    <EditMenuProvider>
      <EditProject />
    </EditMenuProvider>
    {path.includes('/search') ? (
      <SearchContainer>
        <Text>
          &quot;&nbsp;{queryString.parse(search).term}&nbsp;&quot; 검색 결과
        </Text>
      </SearchContainer>
    ) : null}
    {children}
    <PaginationComponent />
  </Container>
);

export default withRouter(ProjectList);
