import React from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import EditMenuProvider from 'store/Common/EditMenu';
import EditProject from 'components/ProjectList/EditProject';
import queryString from 'query-string';
import PaginationComponent from 'components/ProjectList/Pagination';

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

const DataContainer = styled.div`
  display: grid;
  grid-auto-columns: row;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const ProjectList = ({ children, location: { search } }) => {
  return (
    <>
      <EditMenuProvider>
        <EditProject />
      </EditMenuProvider>
      {search && queryString.parse(search).q !== '' ? (
        <SearchContainer>
          <Text>
            &quot;&nbsp;{queryString.parse(search).q}&nbsp;&quot; 검색 결과
          </Text>
        </SearchContainer>
      ) : null}
      <DataContainer>{children}</DataContainer>
      <PaginationComponent />
    </>
  );
};
export default withRouter(ProjectList);
