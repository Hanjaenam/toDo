import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Project from './Project';

const ProjectContainer = ({ data, history }) => {
  const handleClick = () => {
    history.push(`/me/project/${data._id}`);
  };
  return <Project data={data} handleClick={handleClick} />;
};

ProjectContainer.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
};

ProjectContainer.defaultProps = {
  data: undefined,
};
export default withRouter(ProjectContainer);
