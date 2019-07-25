import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setProjectData } from 'store/modules/detailProject';
import { setHoverImportace } from 'store/modules/StarButton';
import StarButton from 'components/NewProjectPage/StarButton';

const StarButtonContainer = ({
  hoverImportance,
  importance,
  setProjectData,
  setHoverImportace,
}) => {
  const containerRef = useRef();
  const handleMouseLeave = () => {
    setHoverImportace(importance);
  };
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      containerRef.current.removeEventListener('mouseleave', handleMouseLeave);
    };
  });
  return (
    <StarButton
      containerRef={containerRef}
      hoverImportance={hoverImportance}
      setProjectData={setProjectData}
      setHoverImportace={setHoverImportace}
    />
  );
};

StarButtonContainer.propTypes = {
  hoverImportance: PropTypes.number.isRequired,
  importance: PropTypes.number.isRequired,
  setProjectData: PropTypes.func.isRequired,
  setHoverImportace: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    hoverImportance: state.starButton,
    importance: state.detailProject.getIn(['data', 'importance']),
  }),
  dispatch => ({
    setProjectData: ({ type, value }) =>
      dispatch(setProjectData({ type, value })),
    setHoverImportace: hoverImportace =>
      dispatch(setHoverImportace(hoverImportace)),
  }),
)(StarButtonContainer);
