import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setHoverImportance as shi } from 'store/modules/StarButton';
import StarButton from 'components/Common/StarButton';

const StarButtonContainer = ({
  edit,
  hoverImportance,
  importance,
  setImportance,
  setHoverImportance,
  ...rest
}) => {
  const handleMouseLeave = () => {
    /**
     * importanceTemplate = 1
     * hoverImportance : hover할때마다 변경된다.
     * mouseleave하면 hoverImportance는 importanceTemplate으로 변경 -> 1
     * click할 경우 importanceTemplate가 변경된다 => ex) 2
     * 이후, mouseleave를 하면 항상 2개가 색칠되어 있음.
     */
    setHoverImportance(importance);
  };
  return (
    <StarButton
      edit={edit}
      hoverImportance={hoverImportance}
      importance={importance}
      handleMouseLeave={handleMouseLeave}
      setImportance={setImportance}
      setHoverImportance={setHoverImportance}
      {...rest}
    />
  );
};

StarButtonContainer.propTypes = {
  edit: PropTypes.bool,
  hoverImportance: PropTypes.number.isRequired,
  importance: PropTypes.number.isRequired,
  setImportance: PropTypes.func,
  setHoverImportance: PropTypes.func.isRequired,
};

StarButtonContainer.defaultProps = {
  edit: false,
  setImportance: undefined,
};

export default connect(
  state => ({
    hoverImportance: state.starButton,
  }),
  dispatch => ({
    setHoverImportance: hoverImportance => dispatch(shi(hoverImportance)),
  }),
)(StarButtonContainer);
