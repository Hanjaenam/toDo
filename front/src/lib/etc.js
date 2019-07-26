export const getProjectListQuery = ({ page, q, sort } = {}) => {
  if (!page && !q && !sort) return `/me/project?page=1&sort=latest&q=`;
  return `/me/project?page=${page}&sort=${sort}&q=${q}`;
};
