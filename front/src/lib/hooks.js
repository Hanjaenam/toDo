import { useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useStatus = () => {
  const [status, setStatus] = useState({
    loading: true,
    error: null,
  });
  const failure = error => setStatus(s => ({ ...s, error }));
  const end = () => setStatus(s => ({ ...s, loading: false }));
  return { loading: status.loading, error: status.error, failure, end };
};

// export const useAxios = () => {
//   const [state, setState] = useState({
//     loading: false,
//     failure: null,
//   });
//   const fetch = opts => {
//     if (!opts.url) return;
//     setState({ ...state, loading: true });
//     return axios(opts)
//       .then(res => {
//         setState({
//           ...state,
//           loading: false,
//         });
//       })
//       .catch(err => {
//         setState({
//           ...state,
//           loading: false,
//           failure: err.response.data.message[0],
//         });
//       });
//   };
//   return { state, fetch, setState };
// };

// export const useReplacePage = (user, history, type = 'private') => {
//   if (type === 'private') {
//     if (!user) {
//       history.replace('/');
//     } else {
//       return true;
//     }
//   } else if (type === 'public') {
//     if (user) {
//       history.replace('/toDoList');
//     } else {
//       return true;
//     }
//   }
// };
