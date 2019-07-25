import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE } from 'styles/mixins';
import Button from 'components/Common/Button';
import theme from 'styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
  border-radius: ${props => props.theme.RADIUS};
  overflow: hidden;
`;

const buttonStyles = css`
  padding: ${props => props.theme.GAP.LARGE};
  svg {
    font-size: 1.3rem;
  }
`;

const StarButton = ({
  containerRef,
  hoverImportance,
  setProjectData,
  setHoverImportace,
}) => (
  <Container ref={containerRef}>
    {new Array(3).fill('').map((_, idx) => (
      <Button
        active={idx + 1 <= hoverImportance}
        hovertype={HOVER_TYPE.COLOR}
        hoveropts={{ hovercolor: theme.COLOR.STAR() }}
        icon={faStar}
        key={`star${idx}`}
        onClick={() => setProjectData({ type: 'importance', value: idx + 1 })}
        onMouseEnter={() => setHoverImportace(idx + 1)}
        styles={buttonStyles}
      />
    ))}
  </Container>
);

StarButton.propTypes = {
  containerRef: PropTypes.shape({}).isRequired,
  hoverImportance: PropTypes.number.isRequired,
  setProjectData: PropTypes.func.isRequired,
  setHoverImportace: PropTypes.func.isRequired,
};

export default StarButton;
