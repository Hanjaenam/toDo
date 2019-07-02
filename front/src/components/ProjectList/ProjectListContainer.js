import React, { useEffect, useState } from 'react';
// import moment from 'moment';
// import Project from 'components/ProjectList/Project';
import AddProject from 'components/ProjectList/AddProject';
import { useFns } from 'store/ProjectList/ProjectList';
import axios from 'axios';
import ProjectList from './ProjectList';

const ProjectListContainer = () => {
  // const dataList = useDataList();
  const { loadData, mapToComponent } = useFns();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios({
      url: '/project/readAll',
      method: 'get',
    })
      .then(res => {
        loadData(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? null : (
    <ProjectList>
      <AddProject />
      {mapToComponent()}
    </ProjectList>
  );
};
export default ProjectListContainer;
