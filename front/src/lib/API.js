import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const authAPI = {
  getInfo: () => {
    return axios({
      url: '/me',
      method: 'GET',
    });
  },
  logIn: ({ email, password }) => {
    return axios({
      url: '/auth/logIn',
      method: 'POST',
      data: {
        email,
        password,
      },
    });
  },
  logOut: () => {
    return axios({
      url: `/me/logOut`,
      method: 'GET',
    });
  },
  register: ({ email, nick, password }) => {
    return axios({
      url: '/auth/register',
      method: 'POST',
      data: {
        email,
        nick,
        password,
      },
    });
  },
};

export const projectAPI = {
  readAll: ({ query }) => {
    return axios({
      url: `/me/project${query}`,
      method: 'GET',
    });
  },
  create: ({ data }) => {
    return axios({
      url: '/me/project/create',
      method: 'post',
      data,
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
