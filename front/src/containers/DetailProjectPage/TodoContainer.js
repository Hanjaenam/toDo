import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ToDo from 'components/DetailProjectPage/ToDo';

const ToDoContainer = ({ data }) => {
  const nowYear = moment().format('YYYY');

  const getCreatedAt = () => {
    if (moment(data.createdAt).format('YYYY') === nowYear) {
      return moment(data.createdAt).format('MM-DD');
    }
    return moment(data.createdAt).format('YY-MM-DD');
  };

  return <ToDo data={data} getCreatedAt={getCreatedAt} />;
};

ToDoContainer.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default ToDoContainer;
