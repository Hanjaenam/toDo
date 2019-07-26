import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { HOVER_TYPE, ACTIVE_STYLES } from 'styles/mixins';
import Button from 'components/Common/Button';
import theme from 'styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props =>
    props.noBorder && !props.edit
      ? null
      : css`
          border: 1px solid ${props => props.theme.COLOR.NOT_FOCUSED.BORDER()};
        `}
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
  setImportance,
  setHoverImportance,
  ...rest
}) => {
  return (
    <Container onMouseLeave={handleMouseLeave} {...rest}>
      {new Array(edit ? 3 : importance).fill('').map((_, idx) => (
        <Button
          active={edit ? idx + 1 <= hoverImportance : idx + 1 <= importance}
          disabled={!edit}
          activetype={ACTIVE_STYLES.COLOR}
          hovertype={HOVER_TYPE.COLOR}
          activeopts={{ color: theme.COLOR.STAR() }}
          icon={faStar}
          key={`star${idx}`}
          onClick={() => setImportance(idx + 1)}
          onMouseEnter={edit ? () => setHoverImportance(idx + 1) : null}
          styles={buttonStyles}
        />
      ))}
    </Container>
  );
};

StarButton.propTypes = {
  edit: PropTypes.bool.isRequired,
  handleMouseLeave: PropTypes.func.isRequired,
  hoverImportance: PropTypes.number.isRequired,
  importance: PropTypes.number.isRequired,
  setImportance: PropTypes.func,
  setHoverImportance: PropTypes.func.isRequired,
};

StarButton.defaultProps = {
  setImportance: undefined,
};

export default StarButton;
