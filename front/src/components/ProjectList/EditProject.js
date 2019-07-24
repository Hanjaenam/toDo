import React from 'react';
import styled from 'styled-components';
import { inputCss } from 'styles/mixins';
import Button from 'components/common/Button';
import SortViewContainer from 'containers/projectList/SortViewContainer';

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr auto auto;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
`;

const Input = styled.input`
  font-size: 1rem;
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: ${props => props.theme.RADIUS};
  ${inputCss}
`;

const EditProject = ({ setSearch }) => (
  <Container>
    <Input
      placeholder="프로젝트 검색"
      onKeyUp={e => {
        const {
          target: { value },
        } = e;
        if (e.keyCode === 13) {
          setSearch(value);
        }
      }}
    />
    <SortViewContainer />
    <Button>새 프로젝트</Button>
  </Container>
);
export default EditProject;
