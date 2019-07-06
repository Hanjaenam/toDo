export const isCreator = (creatorId, userId) => {
  if (String(creatorId) !== userId) return false;
  return true;
};
