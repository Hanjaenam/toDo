import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useProjectFns, useProjectValues } from 'store/Project';
import { useStatus } from 'lib/hooks';

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

const DetailProjectPage = ({
  match: {
    params: { title },
  },
}) => {
  const { loadData } = useProjectFns();
  const { selectedProjectId } = useProjectValues();
  const { toDoListDatas } = useProjectValues();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (toDoListDatas === undefined) {
      axios({
        url: `/toDoList/read/${selectedProjectId}`,
        method: 'get',
      })
        .then(res => {
          loadData({ data: res.data, type: 'toDoList' });
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
        {/* <DetailProject /> */}
        {toDoListDatas === undefined || error ? null : <DetailProject />}
      </Container>
    </>
  );
};

DetailProjectPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailProjectPage;
