import axios from 'axios';

// eslint-disable-next-line import/prefer-default-export
export const authAPI = {
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
  getInfo: () => {
    return axios({
      url: '/me',
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
  create: ({ isPublic, importance, title }) => {
    return axios({
      url: '/me/project/create',
      method: 'post',
      data: {
        isPublic,
        importance,
        title,
      },
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
  readOne: ({ title }) => {
    return axios({ url: `/me/project/${title}?page=1`, method: 'get' });
  },
  readAll: ({ query }) => {
    return axios({
      url: `/me/project${query}`,
      method: 'GET',
    });
  },
  search: ({ term }) => {
    return axios({
      url: `/me/project/search?term=${term}`,
      method: 'GET',
    });
  },
};
