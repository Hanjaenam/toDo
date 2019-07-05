export const unshift = data => state => [data, ...state];
export const deleteOne = id => state => state.filter(data => data._id !== id);
export const deleteMany = idList => state =>
  state.filter(data => !idList.some(id => data._id === id));
export const patch = ({ id, newData }) => state =>
  state.map(data => {
    if (data._id !== id) return data;
    return { ...newData };
  });
export const init = () => [];
export const checkArray = data => {
  if (!Array.isArray(data)) {
    throw Error(`${data} 는 배열이 아닙니다.`);
  }
};
