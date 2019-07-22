import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Title from 'components/Common/Text';
import moment from 'moment';
import Star from '../../Common/Star';

const Container = styled.div`
  background-color: white;
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
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  transition: ${props => props.theme.TRANSITION};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.COLOR.PRIMARY()};
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

const Project = ({ data, handleClick }) => (
  <Container onClick={handleClick}>
    <Title styles={titleStyles}>{data.title}</Title>
    <Star importance={data.importance} />
    <Date>{moment(data.createdAt).format('YYYY-MM-DD')}</Date>
  </Container>
);

Project.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
  handleClick: PropTypes.func.isRequired,
};

Project.defaultProps = {
  data: undefined,
};
export default Project;
