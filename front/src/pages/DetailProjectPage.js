import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  getProjectData as gpd,
  setIsNewToDo as sintd,
} from 'store/modules/detailProject';
import { connect } from 'react-redux';
import { useOnlyPrivate } from 'lib/hooks';
import DetailProjectTemplate from 'components/DetailProjectPage/DetailProjectTemplate';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import SearchSortNew from 'components/Common/SearchSortNew';
import NewToDoContainer from 'containers/DetailProjectPage/NewToDoContainer';
import ProjectContainer from 'containers/DetailProjectPage/ProjectContainer';
import ToDoListContainer from 'containers/DetailProjectPage/ToDoListContainer';

const DetailProjectPage = ({
  history,
  isNewToDo,
  match: {
    params: { title },
  },
  getProjectLoading,
  getProjectSuccess,
  getProjectData,
  signIn,
  setIsNewToDo,
}) => {
  const startRender = useOnlyPrivate({ history, signIn });

  useEffect(() => {
    getProjectData({ title });
  }, []);

  return startRender && !getProjectLoading && getProjectSuccess ? (
    <DetailProjectTemplate
      title={title}
      history={history}
      projectComponent={<ProjectContainer />}
      editComponent={
        <>
          <SearchSortNew
            newButtonText={LANG.NEW_TO_DO[htmlLang]}
            setIsNewToDo={setIsNewToDo}
            isNewToDo={isNewToDo}
          />
          {isNewToDo ? <NewToDoContainer /> : null}
        </>
      }
    >
      <ToDoListContainer />
    </DetailProjectTemplate>
  ) : null;
};
DetailProjectPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  isNewToDo: PropTypes.bool.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getProjectData: PropTypes.func.isRequired,
  getProjectLoading: PropTypes.bool,
  getProjectSuccess: PropTypes.bool,
  signIn: PropTypes.bool.isRequired,
  setIsNewToDo: PropTypes.func.isRequired,
};

DetailProjectPage.defaultProps = {
  getProjectLoading: undefined,
  getProjectSuccess: undefined,
};

export default connect(
  state => ({
    isNewToDo: state.detailProject.get('isNewToDo'),
    getProjectLoading: state.pender.pending['detailProject/GET_PROJECT_DATA'],
    getProjectSuccess: state.pender.success['detailProject/GET_PROJECT_DATA'],
    signIn: state.user.get('signIn'),
  }),
  dispatch => ({
    getProjectData: ({ title }) => dispatch(gpd({ title })),
    setIsNewToDo: isNewToDo => dispatch(sintd(isNewToDo)),
  }),
)(DetailProjectPage);
