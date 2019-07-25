import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import Project from 'components/DetailProjectPage/Project';
// import ToDoListGroupByDate from 'components/DetailProjectPage/'

const DetailProjectPage = ({
  match: {
    params: { title },
  },
}) => (
  <PageTemplate title={title}>
    <Project />
  </PageTemplate>
);

export default DetailProjectPage;
