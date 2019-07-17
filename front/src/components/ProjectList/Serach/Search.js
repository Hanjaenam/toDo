import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';

const Container = styled.div`
  flex: 1;
  position: relative;
  max-width: 400px;
`;

const SearchInput = styled.input`
  font-size: 1rem;
  box-sizing: border-box;
  width: 100%;
  padding: ${props => props.theme.GAP.SMALL};
  padding-right: 2rem;
  border-radius: ${props => props.theme.RADIUS};
  outline: none;
  border: none;
  transition: background-color ${props => props.theme.TRANSITION};
  background-color: rgb(210, 210, 210);
  &:focus {
    background: white;
  }
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.SMALL}) {
    ${props =>
      props.expandSearch
        ? css`
            width: 400px;
          `
        : null}
  }
`;

const ButtonStyles = css`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  padding: 0 ${props => props.theme.GAP.STANDARD};
`;

const Search = ({ expandSearch, handleKeyUp, handleFocus, handleBlur }) => {
  return (
    <Container>
      <SearchInput
        placeholder="프로젝트 검색"
        onKeyUp={handleKeyUp}
        onFocus={handleFocus}
        onBlur={handleBlur}
        expandSearch={expandSearch}
      />
      <Button
        icon={faSearch}
        hoverType={HOVER_TYPE.COLOR}
        styles={ButtonStyles}
      />
    </Container>
  );
};

Search.propTypes = {
  expandSearch: PropTypes.bool.isRequired,
  handleKeyUp: PropTypes.func.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};
export default Search;
