export const push = data => state => [...state, data];
export const unshift = data => state => [data, ...state];
export const deleteOne = id => state => state.filter(data => data._id !== id);
export const deleteMany = idList => state =>
  state.filter(data => !idList.some(id => data._id === id));
export const patch = ({ id, patchedData }) => state =>
  state.map(data => {
    if (data._id !== id) return data;
    return { ...patchedData };
  });
export const init = () => [];
export const checkArray = data => {
  if (!Array.isArray(data)) {
    throw Error(`${data} 는 배열이 아닙니다.`);
  }
};
export const checkObject = data => {
  if (typeof data !== 'object') {
    throw Error(`${data}는 object가 아닙니다.`);
  }
};
