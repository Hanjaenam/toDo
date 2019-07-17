import axios from 'axios';

export const API_PatchProject = ({ id, data }) => {
  return axios({ url: `me/project/patch/${id}`, method: 'patch', data });
};
