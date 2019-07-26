import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'styled-components';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import Pagination from 'components/Common/Pagination';

const buttonStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  color: white;
  & + & {
    margin-left: ${props => props.theme.GAP.TINY};
  }
`;

const PaginationContainer = ({ page, lastPage }) => {
  const mapToComponent = () =>
    new Array(lastPage).fill('').map((_, idx) => (
      <Button
        active={page === idx + 1}
        icon={idx + 1 === 10 ? faAngleRight : null}
        key={`page_${idx}`}
        styles={buttonStyles}
      >
        {idx !== 9 ? idx + 1 : null}
      </Button>
    ));

  return <Pagination>{mapToComponent()}</Pagination>;
};

PaginationContainer.propTypes = {
  page: PropTypes.number.isRequired,
  lastPage: PropTypes.number.isRequired,
};

export default PaginationContainer;
