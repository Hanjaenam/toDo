import React from 'react';
import PageTemplateContainer from 'containers/common/PageTemplateContainer';
import SignTemplate from 'containers/common/SignTemplateContainer';

const SignPage = ({ history }) => (
  <PageTemplateContainer sign title="로그인">
    <SignTemplate history={history} />
  </PageTemplateContainer>
);

export default SignPage;
