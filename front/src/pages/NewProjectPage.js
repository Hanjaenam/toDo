import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useOnlyPrivate } from 'lib/hooks';
import LANG, { htmlLang } from 'lib/htmlLanguage';
import NewProjectContainer from 'containers/NewProjectPage/NewProjectContainer';
import PageTemplate from 'components/Common/PageTemplate';

const NewProjectPage = ({ history, signIn }) => {
  const startRednder = useOnlyPrivate({ history, signIn });

  return startRednder ? (
    <PageTemplate title={LANG.NEW_PROJECT[htmlLang]}>
      <NewProjectContainer />
    </PageTemplate>
  ) : null;
};

NewProjectPage.propTypes = {
  history: PropTypes.shape({}).isRequired,
  signIn: PropTypes.bool.isRequired,
};

export default connect(
  state => ({ signIn: state.user.get('signIn') }),
  null,
)(NewProjectPage);
