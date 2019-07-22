import Memo from 'models/Memo';
import ToDo from 'models/ToDo';

export const create = async (req, res) => {
  const {
    params: { id: toDoId },
    body,
  } = req;
  if (!body) return res.status(400).end();
  try {
    const toDo = await ToDo.findById(toDoId).lean();
    if (!toDo) {
      return res.status(400).end();
    }
    const memo = await Memo.create({
      ...body,
      creator: req.user._id,
      toDo: toDoId,
    });
    await memo.populate({ path: 'creator', select: 'email nick' });
    // const memoPopulateCreator = await memo.populate({
    //   path: 'creator',
    //   select: 'email nick',
    // });
    return res.json(
      await memo.populate({ path: 'creator', select: 'email nick' }),
    );
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
    await Memo.findOneAndDelete({ _id: memoId, creator: req.user._id });
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
    body,
  } = req;
  try {
    const memo = await Memo.findOneAndUpdate(
      { _id: memoId, creator: req.user._id },
      body,
      { new: true },
    )
      .populate({
        path: 'creator',
        select: 'email nick',
      })
      .lean();
    return res.json(memo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
