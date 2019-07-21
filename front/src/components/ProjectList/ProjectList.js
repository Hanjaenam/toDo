import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import EditMenuProvider from 'store/Common/EditMenu';
import EditProject from 'components/ProjectList/EditProject';
import queryString from 'query-string';
import PaginationComponent from 'components/ProjectList/Pagination';
import PageTemplate from 'components/Common/PageTemplate';

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
  <PageTemplate>
    <EditMenuProvider>
      <EditProject />
    </EditMenuProvider>
    {queryString.parse(search).q === '' ? null : (
      <SearchContainer>
        <Text>
          &quot;&nbsp;{queryString.parse(search).q}&nbsp;&quot; 검색 결과
        </Text>
      </SearchContainer>
    )}
    {children}
    <PaginationComponent />
  </PageTemplate>
);
export default withRouter(ProjectList);
