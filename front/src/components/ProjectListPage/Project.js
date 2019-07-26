import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen, faStar } from '@fortawesome/free-solid-svg-icons';
import { hover, HOVER_TYPE } from 'styles/mixins';

const CreatedAt = styled.p`
  font-size: 0.7rem;
`;

const Container = styled.div`
  border: 1px solid black;
  padding: ${props => props.theme.GAP.MEDIUM};
  border-radius: ${props => props.theme.RADIUS};
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  grid-gap: ${props => props.theme.GAP.MEDIUM};
  ${hover({ type: HOVER_TYPE.BACKGROUND_COLOR })};
  &:hover {
    ${CreatedAt} {
      color: white;
    }
  }
`;

const LockIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
`;

const Title = styled.p`
  flex: 1;
`;

const EtcContainer = styled.div`
  text-align: right;
`;

const StarIcon = styled(FontAwesomeIcon)`
  color: ${props => props.theme.COLOR.STAR()} !important;
`;

const Project = ({ data, history, getCreatedAt }) => (
  <Container onClick={() => history.push(`/me/project/${data.title}`)}>
    <LockIcon icon={data.isPublic ? faLockOpen : faLock} />
    <Title>{data.title}</Title>
    <EtcContainer>
      {new Array(data.importance).fill('').map((_, idx) => (
        <StarIcon icon={faStar} key={`star_${idx}`} />
      ))}
      <CreatedAt>{getCreatedAt()}</CreatedAt>
    </EtcContainer>
  </Container>
);

Project.propTypes = {
  data: PropTypes.shape({}),
  history: PropTypes.shape({}).isRequired,
  getCreatedAt: PropTypes.func.isRequired,
};

Project.defaultProps = {
  data: {},
};
export default withRouter(Project);
