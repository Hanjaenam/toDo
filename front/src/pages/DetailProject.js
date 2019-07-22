import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus, useOnlyPrivate } from 'lib/hooks';
import DetailProjectProvider from 'store/DetailProject';
import { useUser } from 'store/User';
import PageTemplate from 'components/Common/PageTemplate';

// const Title = styled.span`
//   font-size: 1rem;
//   font-weight: 500;
//   user-select: none;
//   color: white;
//   padding: ${props => props.theme.GAP.MEDIUM};
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

const DetailProjectPage = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  const [project, setProject] = useState();
  const [detailProject, setDetailProject] = useState();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (!userExisted) return;
    if (!detailProject === undefined) return;
    axios({
      url: `/me/project/${id}?page=1`,
      method: 'get',
    })
      .then(res => {
        const { data } = res;
        setProject(data.project);
        setDetailProject(data.toDoListByDate);
      })
      .catch(err => failure(err));
  }, [userExisted]);
  return detailProject === undefined || error ? null : (
    <PageTemplate title={project.title} header={<Header history={history} />}>
      <DetailProjectProvider
        value={{
          detailProject,
          project,
          fns: { setDetailProject, setProject },
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
