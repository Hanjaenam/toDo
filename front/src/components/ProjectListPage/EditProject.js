import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { inputCss } from 'styles/mixins';
import Button from 'components/Common/Button';
import SortViewContainer from 'containers/ProjectListPage/SortViewContainer';
import LANG, { htmlLang } from 'lib/htmlLanguage';

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
      placeholder={LANG.SEARCH_PROJECT[htmlLang]}
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
    <Button to="/me/project/new">{LANG.NEW_PROJECT[htmlLang]}</Button>
  </Container>
);

EditProject.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default EditProject;
