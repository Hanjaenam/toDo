import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import Title from 'components/Common/Text';
import moment from 'moment';
import Star from 'components/Common/Star';

const Container = styled.div`
  background-color: white;
  padding: ${props => props.theme.GAP.MEDIUM} ${props => props.theme.GAP.LARGE};
  display: flex;
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

const StarDataContainer = styled.div`
  > div:first-child {
    margin-bottom: ${props => props.theme.GAP.SMALL};
  }
  text-align: center;
`;

const Date = styled.p`
  font-style: italic;
  font-size: 0.8rem;
  color: ${props => props.theme.COLOR.PRIMARY()};
`;

const titleStyles = css`
  grid-row: 1 / span 2;
`;

const PublicIconContainer = styled.p`
  font-size: 1.2rem;
`;

const starStyles = css`
  font-size: 1.2rem;
`;

const Project = ({ data, handleClick }) => (
  <Container onClick={handleClick}>
    <PublicIconContainer>
      <FontAwesomeIcon icon={data.isPublic ? faLockOpen : faLock} />
    </PublicIconContainer>
    <Title styles={titleStyles}>{data.title}</Title>
    <StarDataContainer>
      <Star importance={data.importance} styles={starStyles} />
      <Date>{moment(data.createdAt).format('YYYY-MM-DD')}</Date>
    </StarDataContainer>
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
