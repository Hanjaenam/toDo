import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus, useOnlyPrivate } from 'lib/hooks';

import DetailProjectProvider from 'store/DetailProject';
import { useUser } from 'store/User';

const Container = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.span`
  font-size: 1rem;
  font-weight: 600;
  user-select: none;
  color: white;
  margin-left: 0.5rem;
`;

const DetailProjectPage = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  const [title, setTitle] = useState();
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
        setTitle(res.data.title);
        setDetailProject(res.data.toDoListByDate);
      })
      .catch(err => failure(err));
  }, [userExisted]);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Header page="detailProject">
          <Title>{title}</Title>
        </Header>
        {detailProject === undefined || error ? null : (
          <DetailProjectProvider
            value={{ detailProject, fns: { setDetailProject } }}
          >
            <DetailProject />
          </DetailProjectProvider>
        )}
      </Container>
    </>
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
