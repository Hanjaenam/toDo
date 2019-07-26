import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Project from 'components/ProjectListPage/Project';

const ProjectContainer = ({ data }) => {
  const nowYear = moment().format('YYYY');

  const getCreatedAt = () => {
    if (moment(data.createdAt).format('YYYY') === nowYear) {
      return moment(data.createdAt).format('MM-DD');
    }
    return moment(data.createdAt).format('YY-MM-DD');
  };

  return <Project data={data} getCreatedAt={getCreatedAt} />;
};

ProjectContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
};
export default ProjectContainer;
