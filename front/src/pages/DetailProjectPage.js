import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useOnlyPrivate } from 'lib/hooks';
import Helmet from 'react-helmet';
import HeaderContainer from 'containers/Common/HeaderContainer';
import DetailProjectContainer from 'containers/DetailProjectPage/DetailProjectContainer';
// import ToDoListGroupByDate from 'components/DetailProjectPage/'

const DetailProjectPage = ({
  history,
  match: {
    params: { title },
  },
  signIn,
}) => {
  const startRender = useOnlyPrivate({ history, signIn });

  return startRender ? (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <HeaderContainer />
      <DetailProjectContainer title={title} />
    </>
  ) : null;
};

DetailProjectPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  signIn: PropTypes.bool.isRequired,
};

export default connect(
  state => ({ signIn: state.user.get('signIn') }),
  null,
)(DetailProjectPage);
