import React from 'react';
import { css } from 'styled-components';
import { useProjectListValues } from 'store/ProjectList';
import { HOVER_TYPE } from 'styles/mixins';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import Pagination from './Pagination';

const buttonStyles = css`
  padding: ${props => props.theme.GAP.SMALL};
  color: white;
  & + & {
    margin-left: 0.1rem;
    font-size: 1.1rem;
  }
`;

const PaginationContainer = () => {
  const { page } = useProjectListValues();
  const mapToComponent = () =>
    new Array(page.total).fill('').map((_, idx) => (
      <Button
        key={`page${idx}`}
        icon={idx + 1 === 10 ? faAngleRight : null}
        hoverType={HOVER_TYPE.BACKGROUND_COLOR}
        styles={buttonStyles}
        hoverOpts={{ minus: 40, active: page.current === idx + 1 }}
      >
        {idx !== 9 ? idx + 1 : null}
      </Button>
    ));
  return <Pagination>{mapToComponent()}</Pagination>;
};
export default PaginationContainer;
