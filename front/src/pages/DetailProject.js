import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus, useOnlyPrivate } from 'lib/hooks';
import DetailProjectProvider from 'store/DetailProject';
import { useUser } from 'store/User';
import PageTemplate from 'components/Common/PageTemplate';

const DetailProjectPage = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  const [project, setProject] = useState(null);
  const [toDoListByDate, setToDoListByDate] = useState(null);
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (!userExisted) return;
    if (!toDoListByDate === null) return;
    axios({
      url: `/me/project/${id}?page=1`,
      method: 'get',
    })
      .then(res => {
        const { data } = res;
        setProject(data.project);
        setToDoListByDate(data.toDoListByDate);
      })
      .catch(err => failure(err));
  }, [userExisted]);
  return toDoListByDate === null || error ? null : (
    <PageTemplate title={project.title} header={<Header />}>
      <DetailProjectProvider
        value={{
          toDoListByDate,
          project,
          fns: { setToDoListByDate, setProject },
        }}
      >
        <DetailProject />
      </DetailProjectProvider>
    </PageTemplate>
  );
};

DetailProjectPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default DetailProjectPage;
