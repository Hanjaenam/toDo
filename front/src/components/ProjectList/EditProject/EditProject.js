import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';
import SearchComponent from 'components/ProjectList/Serach';
import SortViewComponent from 'components/ProjectList/SortView';

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  background: transparent;
  position: relative;
  /* margin-bottom: ${props => props.theme.GAP.SMALL}; */
  padding: ${props => props.theme.GAP.ONE} 0;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.MEDIUM}) {
    padding-left: ${props => props.theme.GAP.MEDIUM};
    padding-right: ${props => props.theme.GAP.MEDIUM};
  }
`;

const ButtonStyles = css`
  box-sizing: border-box;
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
  padding: ${props => props.theme.GAP.MEDIUM};
  font-size: 1rem;
`;

const Project = ({ createProject }) => {
  const titleRef = useRef();
  return (
    <Container>
      <SearchComponent />
      <SortViewComponent />
      <Button
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={ButtonStyles}
        onClick={() => createProject(titleRef)}
      >
        프로젝트 생성
      </Button>
    </Container>
  );
};

Project.propTypes = {
  createProject: PropTypes.func.isRequired,
};

export default Project;
