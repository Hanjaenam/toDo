import React from 'react';
import PageTemplate from 'components/Common/PageTemplate';
import Header from 'components/Common/Header';
import { useOnlyPrivate } from 'lib/hooks';
import { useUser } from 'store/User';
import CreateProject from 'components/CreateProject';

const CreateProjectPage = ({ history }) => {
  const user = useUser();
  const userExisted = useOnlyPrivate({ user, history });
  return !userExisted ? null : (
    <PageTemplate title="프로젝트 생성" header={<Header />}>
      <CreateProject history={history} />
    </PageTemplate>
  );
};
export default CreateProjectPage;
