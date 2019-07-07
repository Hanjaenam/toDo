// eslint-disable-next-line import/prefer-default-export
export const isMine = (creatorId, userId) => {
  if (String(creatorId) !== String(userId)) return false;
  return true;
};
