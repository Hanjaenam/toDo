export const getProjectListQuery = ({ page, q, sort }) =>
  `/me/project?page=${page}&sort=${sort}&q=${q}`;
