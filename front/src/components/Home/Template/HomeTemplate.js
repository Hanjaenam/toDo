import React from 'react';
import ToDoCardList from 'components/Home/ToDoCardList';
import ToDoCardListProvider from 'components/Home/ToDoCardList/ToDoCardListContext';

const Template = () => {
  return (
    <ToDoCardListProvider>
      <ToDoCardList />
    </ToDoCardListProvider>
  );
};
export default Template;
