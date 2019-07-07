import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus } from 'lib/hooks';
import DetailProjectProvider, {
  useDetailProjectValues,
  useDetailProjectFns,
} from 'store/DetailProject';

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

const DetailProjectPage = ({ id }) => {
  const { toDoListDatas } = useDetailProjectValues();
  const { loadData, setProjectId } = useDetailProjectFns();
  const [title, setTitle] = useState();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    setProjectId(id);
    if (toDoListDatas === undefined) {
      axios({
        url: `/me/project/${id}`,
        method: 'get',
      })
        .then(res => {
          const { data } = res;
          setTitle(data.title);
          loadData(data.toDoList);
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
        {toDoListDatas === undefined || error ? null : <DetailProject />}
      </Container>
    </>
  );
};

DetailProjectPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ({
  match: {
    params: { id },
  },
}) => (
  <DetailProjectProvider>
    <DetailProjectPage id={id} />
  </DetailProjectProvider>
);
