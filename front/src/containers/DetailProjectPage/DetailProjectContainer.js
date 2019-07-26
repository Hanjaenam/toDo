import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as detailProjectActions from 'store/modules/detailProject';
import DetailProject from 'components/DetailProjectPage/DetailProject';

const DetailProjectContainer = ({
  DetailProjectActions: { getProjectData },
  getProjectLoading,
  getProjectSuccess,
  title,
}) => {
  useEffect(() => {
    getProjectData({ title });
  }, []);
  return !getProjectLoading && getProjectSuccess ? <DetailProject /> : null;
};

DetailProjectContainer.propTypes = {
  DetailProjectActions: PropTypes.shape({
    getProjectData: PropTypes.func.isRequired,
  }).isRequired,
  getProjectLoading: PropTypes.bool,
  getProjectSuccess: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

DetailProjectContainer.defaultProps = {
  getProjectLoading: undefined,
  getProjectSuccess: undefined,
};

export default connect(
  state => ({
    getProjectLoading: state.pender.pending['detailProject/GET_PROJECT_DATA'],
    getProjectSuccess: state.pender.success['detailProject/GET_PROJECT_DATA'],
  }),
  dispatch => ({
    DetailProjectActions: bindActionCreators(detailProjectActions, dispatch),
  }),
)(DetailProjectContainer);
