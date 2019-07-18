import React, { useRef, useEffect } from 'react';
import ListEditMenuProvider from 'store/Common/ListEditMenu';
import { useDetailProjectValues } from 'store/DetailProject';
import ToDoList from 'components/DetailProject/ToDoList';
import theme from 'styles/theme';
import DetailProject from './DetailProject';

const DetailProjectContainer = () => {
  const { detailProject } = useDetailProjectValues();
  const containerRef = useRef();
  const handleMouseScroll = e => {
    if (window.innerWidth <= parseInt(theme.BREAKPOINTS.MEDIUM, 10)) return;
    if (e.target.classList !== containerRef.current.classList) return;
    /* For IE -> e 가 없으므로 window.event를 할당한다. */
    // e = e || window.event;
    e.preventDefault();
    /* e.wheelDelta : IE/Chrome/Opera */
    /* e.detail : Mozilla case */
    e.target.scrollLeft += e.wheelDelta || -e.detail;
  };
  useEffect(() => {
    if (containerRef.current) {
      // IE10, Chrome, Safari, Opera
      containerRef.current.addEventListener('mousewheel', handleMouseScroll);
      // Firefox
      containerRef.current.addEventListener(
        'DOMMouseScroll',
        handleMouseScroll,
      );
    }
  });
  const mapToComponent = () =>
    detailProject.map(({ toDoList, _id }) => (
      <ListEditMenuProvider key={_id}>
        <ToDoList data={toDoList} createdAt={_id} />
      </ListEditMenuProvider>
    ));
  return (
    <DetailProject containerRef={containerRef}>
      {mapToComponent()}
    </DetailProject>
  );
};
export default DetailProjectContainer;
