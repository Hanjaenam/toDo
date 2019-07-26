import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProjectDataTemplate } from 'store/modules/detailProject';
import { setHoverImportance } from 'store/modules/StarButton';
import StarButton from 'components/Common/StarButton';

const StarButtonContainer = ({
  edit,
  hoverImportance,
  importance,
  importanceTemplate,
  setProjectDataTemplate,
  setHoverImportance,
}) => {
  const handleMouseLeave = () => {
    /**
     * importanceTemplate = 1
     * hoverImportance : hover할때마다 변경된다.
     * mouseleave하면 hoverImportance는 importanceTemplate으로 변경 -> 1
     * click할 경우 importanceTemplate가 변경된다 => ex) 2
     * 이후, mouseleave를 하면 항상 2개가 색칠되어 있음.
     */
    setHoverImportance(importanceTemplate);
  };
  return (
    <StarButton
      edit={edit}
      hoverImportance={hoverImportance}
      importance={importance}
      handleMouseLeave={handleMouseLeave}
      setProjectDataTemplate={setProjectDataTemplate}
      setHoverImportance={setHoverImportance}
    />
  );
};

StarButtonContainer.propTypes = {
  edit: PropTypes.bool,
  hoverImportance: PropTypes.number.isRequired,
  importance: PropTypes.number,
  importanceTemplate: PropTypes.number.isRequired,
  setProjectDataTemplate: PropTypes.func.isRequired,
  setHoverImportance: PropTypes.func.isRequired,
};

StarButtonContainer.defaultProps = {
  edit: false,
  importance: undefined,
};

export default connect(
  state => ({
    importance: state.detailProject.getIn(['data', 'importance']),
    hoverImportance: state.starButton,
    importanceTemplate: state.detailProject.getIn([
      'dataTemplate',
      'importance',
    ]),
  }),
  dispatch => ({
    setProjectDataTemplate: ({ type, value }) =>
      dispatch(setProjectDataTemplate({ type, value })),
    setHoverImportance: hoverImportance =>
      dispatch(setHoverImportance(hoverImportance)),
  }),
)(StarButtonContainer);
