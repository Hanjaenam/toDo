import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useOnlyPublic } from 'lib/hooks';
import PageTemplate from 'components/Common/PageTemplate';
import SignTemplate from 'containers/Common/SignTemplateContainer';

const RegisterPage = ({ history, signIn }) => {
  const startRender = useOnlyPublic({ history, signIn });

  return startRender ? (
    <PageTemplate sign title="회원가입">
      <SignTemplate register history={history} />
    </PageTemplate>
  ) : null;
};

RegisterPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  signIn: PropTypes.bool.isRequired,
};

export default connect(
  state => ({
    signIn: state.user.get('signIn'),
  }),
  null,
)(RegisterPage);
