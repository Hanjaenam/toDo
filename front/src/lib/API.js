import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const projectAPI = {
  readAll: ({ query }) => {
    return axios({
      url: `/me/project${query}`,
      method: 'GET',
    });
  },
  delete: ({ id }) => {
    return axios({
      url: `/me/project/delete/${id}`,
      method: 'delete',
    });
  },
  patch: ({ id, data }) => {
    return axios({ url: `/me/project/patch/${id}`, method: 'PATCH', data });
  },
  search: ({ term }) => {
    return axios({
      url: `/me/project/search?term=${term}`,
      method: 'GET',
    });
  },
};

export const userAPI = {
  logOut: () => {
    return axios({
      url: `/me/logOut`,
      method: 'GET',
    });
  },
};
