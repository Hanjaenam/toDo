import Memo from 'models/Memo';
import ToDo from 'models/ToDo';

export const readAllFromToDo = async (req, res) => {
  const {
    params: { id: toDoId },
    query: { page },
  } = req;
  try {
    const { memo } = await ToDo.findById(toDoId).populate({
      path: 'memo',
      options: {
        sort: { createdAt: -1 },
        limit: 10,
        skip: (page - 1) * 10,
      },
      populate: { path: 'creator', select: 'email nick' },
    });
    return res.json(memo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const create = async (req, res) => {
  const {
    params: { id: toDoId },
    body: { content },
  } = req;
  if (!content) return res.status(400).end();
  try {
    const toDo = await ToDo.findById(toDoId);
    if (!toDo) {
      return res.status(400).end();
    }
    const memo = await Memo.create({
      content,
      creator: req.user._id,
      toDo: toDoId,
    });
    const memoPopulateCreator = await memo
      .populate({
        path: 'creator',
        select: 'email nick',
      })
      .execPopulate();
    return res.json(memoPopulateCreator);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const deleteOne = async (req, res) => {
  const {
    params: { id: memoId },
  } = req;
  try {
    await ToDo.findOneAndDelete({ _id: memoId, creator: req.user._id });
    // toDo pull 안함
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const deleteMany = async (req, res) => {
  const { body: memoIds } = req;
  try {
    // for (let i = 0; i < memoIds.length; i += 1) {
    //   Memo.findOneAndDelete({ _id: memoIds[i], creator: req.user._id }).exec();
    // }
    memoIds.forEach(memoId =>
      Memo.findOneAndDelete({ _id: memoId, creator: req.user._id }).exec(),
    );
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const patch = async (req, res) => {
  const {
    params: { id: memoId },
    body: content,
  } = req;
  try {
    const memo = Memo.findByIdAndUpdate(
      { _id: memoId, creator: req.user._id },
      { content },
      { new: true },
    );
    return res.json(memo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
