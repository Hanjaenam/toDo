import React from 'react';
import PageTemplateContainer from 'containers/common/PageTemplateContainer';
import SignTemplate from 'containers/common/SignTemplateContainer';

const SignPage = ({ history }) => (
  <PageTemplateContainer sign title="회원가입">
    <SignTemplate register history={history} />;
  </PageTemplateContainer>
);

export default SignPage;
