import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLockOpen, faLock } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import StarButtonContainer from 'containers/Common/StarButtonContainer';

const Container = styled.div`
  box-sizing: border-box;
  background-color: ${props => props.theme.COLOR.NOT_FOCUSED.BACKGROUND};
  button[disabled] {
    background-color: transparent;
    > svg {
      color: ${props => props.theme.COLOR.STAR()};
    }
  }
`;

const Center = styled.div`
  width: ${props => props.theme.BREAKPOINTS.WIDE};
  margin: 0 auto;
  @media screen and (max-width: ${props => props.theme.BREAKPOINTS.WIDE}) {
    width: 100%;
  }
  display: grid;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: ${props => props.theme.GAP.ONE};
`;

const StarWhenContainer = styled.div`
  text-align: center;
`;

const CreatedAt = styled.p`
  font-size: 0.8rem;
`;

const LockIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
`;

const Title = styled.p`
  font-size: 1.3rem;
`;

const Project = ({
  projectData: { createdAt, isPublic, importance, title },
}) => (
  <Container>
    <Center>
      <LockIcon icon={isPublic ? faLockOpen : faLock} />
      <Title>{title}</Title>
      <StarWhenContainer>
        <StarButtonContainer noBorder importance={importance} />
        <CreatedAt>{moment(createdAt).format('YYYY-MM-DD')}</CreatedAt>
      </StarWhenContainer>
    </Center>
  </Container>
);

Project.propTypes = {
  projectData: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    isPublic: PropTypes.bool.isRequired,
    importance: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};
export default Project;
