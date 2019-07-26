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
  edit,
  handleMouseLeave,
  hoverImportance,
  importance,
  setProjectDataTemplate,
  setHoverImportance,
}) => (
  <Container onMouseLeave={handleMouseLeave}>
    {new Array(edit ? 3 : importance).fill('').map((_, idx) => (
      <Button
        active={edit ? idx + 1 <= hoverImportance : true}
        disabled={!edit}
        hovertype={HOVER_TYPE.COLOR}
        hoveropts={{ hovercolor: theme.COLOR.STAR() }}
        icon={faStar}
        key={`star${idx}`}
        onClick={() =>
          setProjectDataTemplate({ type: 'importance', value: idx + 1 })
        }
        onMouseEnter={edit ? () => setHoverImportance(idx + 1) : null}
        styles={buttonStyles}
      />
    ))}
  </Container>
);

StarButton.propTypes = {
  edit: PropTypes.bool.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  hoverImportance: PropTypes.number.isRequired,
  setProjectDataTemplate: PropTypes.func.isRequired,
  setHoverImportance: PropTypes.func.isRequired,
};

export default StarButton;
