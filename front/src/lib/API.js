import axios from 'axios';

const authAxios = axios.create({
  baseURL: '/api/auth',
});

export const authAPI = {
  logIn: ({ email, password }) => {
    return authAxios({
      url: '/logIn',
      method: 'POST',
      data: {
        email,
        password,
      },
    });
  },
  logOut: () => {
    return authAxios({
      url: `/logOut`,
      method: 'GET',
    });
  },
  getInfo: () => {
    return axios({
      url: '/api/me',
      method: 'GET',
    });
  },
  register: ({ email, nick, password }) => {
    return authAxios({
      url: '/register',
      method: 'POST',
      data: {
        email,
        nick,
        password,
      },
    });
  },
};

const projectAxios = axios.create({
  baseURL: '/api/me/project',
});

export const projectAPI = {
  create: ({ isPublic, importance, title }) => {
    return projectAxios({
      url: '/create',
      method: 'post',
      data: {
        isPublic,
        importance,
        title,
      },
    });
  },
  delete: ({ id }) => {
    return projectAxios({
      url: `/delete/${id}`,
      method: 'delete',
    });
  },
  patch: ({ id, data }) => {
    return projectAxios({ url: `/patch/${id}`, method: 'PATCH', data });
  },
  readOne: ({ title }) => {
    return projectAxios({ url: `/${title}?page=1`, method: 'get' });
  },
  readAll: ({ query }) => {
    return projectAxios({
      url: `${query}`,
      method: 'GET',
    });
  },
  search: ({ term }) => {
    return projectAxios({
      url: `/search?term=${term}`,
      method: 'GET',
    });
  },
};

const toDoAxios = axios.create({
  baseURL: `/api/me/toDo`,
});

export const toDoAPI = {
  create: ({ projectId, title, memo, importance, order }) => {
    return toDoAxios({
      url: `/create/${projectId}`,
      method: 'POST',
      data: {
        title,
        memo,
        importance,
        order,
      },
    });
  },
};
