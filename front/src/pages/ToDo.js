import React from 'react';
import Helmet from 'react-helmet';
import ToDoTemplate from 'components/ToDo/Template';

const ToDo = () => (
  <>
    <Helmet>
      <title>ToDo</title>
    </Helmet>
    <ToDoTemplate />
  </>
);
export default ToDo;
