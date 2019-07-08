import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus } from 'lib/hooks';
import DataProvider, { useDataValues, useDataFns } from 'store/Common/Data';
import { useOnlyPrivateValues } from 'store/Common/OnlyPrivate';

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
`;

const DetailProjectPage = ({ title }) => {
  const { detailProject } = useDataValues();
  const { loadData } = useDataFns();
  const { selectedProjectId } = useOnlyPrivateValues();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {}, [detailProject]);
  useEffect(() => {
    if (detailProject === undefined) {
      axios({
        url: `/me/toDo/${selectedProjectId}?page=1`,
        method: 'get',
      })
        .then(res => {
          loadData({ type: 'detailProject', data: res.data });
        })
        .catch(err => failure(err));
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>ToDo</title>
      </Helmet>
      <Container>
        <Header>
          <Title>{title}</Title>
        </Header>
        {detailProject === undefined || error ? null : <DetailProject />}
      </Container>
    </>
  );
};

DetailProjectPage.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ({
  match: {
    params: { title },
  },
}) => (
  <DataProvider>
    <DetailProjectPage title={title} />
  </DataProvider>
);
