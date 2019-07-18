import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Title from 'components/Common/Text';
import moment from 'moment';
import EditImportance from '../EditImportance';

const Container = styled.div`
  & + & {
    margin-top: ${props => props.theme.GAP.MEDIUM};
  }
  padding: ${props => props.theme.GAP.MEDIUM};
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 1fr auto;
  flex: 1;
  box-sizing: border-box;
  border-radius: ${props => props.theme.RADIUS};
  justify-content: space-between;
  align-items: center;
  transition: box-shadow ${props => props.theme.TRANSITION};
  border: 1px solid ${props => props.theme.BORDER.NOT_FOCUS};
  transition: ${props => props.theme.TRANSITION};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.PRIMARY()};
    p {
      color: white;
    }
  }
`;

const Date = styled.p`
  font-style: italic;
  font-size: 0.8rem;
`;

const titleStyles = css`
  grid-row: 1 / span 2;
`;

const Project = ({ data, titleChangeMode, patchProject, handleClick }) => (
  <Container onClick={handleClick}>
    <Title
      textChangeMode={titleChangeMode}
      handlePatch={patchProject}
      styles={titleStyles}
    >
      {data.title}
    </Title>
    <EditImportance id={data._id} importance={data.importance} />
    <Date>{moment(data.createdAt).format('YYYY-MM-DD')}</Date>
  </Container>
);

Project.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),

  titleChangeMode: PropTypes.bool.isRequired,
  patchProject: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Project.defaultProps = {
  data: undefined,
};
export default Project;
