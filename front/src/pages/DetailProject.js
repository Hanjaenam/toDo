import React, { useEffect, createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import DetailProject from 'components/DetailProject';
import Header from 'components/Common/Header';
import axios from 'axios';
import { useStatus } from 'lib/hooks';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/Common/Button';
import { HOVER_TYPE } from 'styles/mixins';

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

export const DetailProjectContext = createContext();
export const useDetailProjectValues = () => {
  const { fns, ...values } = useContext(DetailProjectContext);
  return values;
};
export const useDetailProjectFns = () => {
  const { fns } = useContext(DetailProjectContext);
  return fns;
};

const DetailProjectPage = ({
  match: {
    params: { id },
  },
  history,
}) => {
  const [title, setTitle] = useState();
  const [detailProject, setDetailProject] = useState();
  const {
    error,
    fns: { failure },
  } = useStatus();
  useEffect(() => {
    if (detailProject === undefined) {
      axios({
        url: `/me/project/${id}?page=1`,
        method: 'get',
      })
        .then(res => {
          setTitle(res.data.title);
          setDetailProject(res.data.toDoListByDate);
        })
        .catch(err => failure(err));
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Header page="detailProject">
          <Button
            icon={faArrowLeft}
            hoverType={HOVER_TYPE.BACKGROUND_COLOR}
            hoverOpts={{ minus: 30 }}
            styles={{
              display: 'inline-block',
              color: 'white',
              fontSize: '1.3rem',
              padding: '.4rem',
            }}
            onClick={() => history.goBack()}
          />
          <Title>{title}</Title>
        </Header>
        {detailProject === undefined || error ? null : (
          <DetailProjectContext.Provider
            value={{ detailProject, fns: { setDetailProject } }}
          >
            <DetailProject />
          </DetailProjectContext.Provider>
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
