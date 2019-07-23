import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  useDetailProjectValues,
  useDetailProjectFns,
} from 'store/DetailProject';
import { projectAPI } from 'lib/API';
import { usePatchData } from 'lib/hooks';
import CONFIG from 'config';
import EditProject from './EditProject';

const EditProjectContainer = ({ history, styles }) => {
  const { project } = useDetailProjectValues();
  const { setProject } = useDetailProjectFns();
  const { patchData, setPatchData } = usePatchData({
    title: project.title,
    isPublic: project.isPublic,
    importance: project.importance,
    isEditMode: false,
  });
  const init = () => {
    setPatchData({
      title: project.title,
      isPublic: project.isPublic,
      importance: project.importance,
      isEditMode: false,
    });
  };
  const deleteProject = () => {
    if (!window.confirm(`${project.title} 를 삭제하시겠습니까?`)) return;
    projectAPI.delete({ id: project._id }).then(() => {
      history.replace(`/me/project?${CONFIG.HOME_INIT_QUERY}`);
    });
  };
  const isChangedSomeValue = () => {
    if (patchData.title !== project.title) return true;
    if (patchData.isPublic !== project.isPublic) return true;
    if (patchData.importance !== project.importance) return true;
    return false;
  };
  const patchProject = () => {
    if (!isChangedSomeValue()) return;
    projectAPI.patch({ id: project._id, data: patchData }).then(res => {
      setProject(res.data);
      init();
    });
  };
  return (
    <EditProject
      project={project}
      deleteProject={deleteProject}
      patchData={patchData}
      setPatchData={setPatchData}
      setTitle={title => setPatchData(s => ({ ...s, title }))}
      patchProject={patchProject}
      styles={styles}
      init={init}
    />
  );
};
export default withRouter(EditProjectContainer);
