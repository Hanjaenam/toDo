import Project from 'models/Project';
import ToDo from 'models/ToDo';
import mongoose from 'mongoose';

export const readFromProject = async (req, res) => {
  const {
    params: { id: projectId },
    query: { page },
  } = req;
  try {
    const toDoListByDate = await ToDo.aggregate([
      {
        $match: {
          creator: req.user._id,
          project: mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          toDoList: {
            $push: {
              _id: '$_id',
              title: '$title',
              content: '$content',
              isCompleted: '$isCompleted',
              createdAt: '$createdAt',
              creator: '$creator',
            },
          },
        },
      },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
      // {
      //   $sort: {
      //     _id: 1,
      //   },
      // },
      {
        $project: {
          toDoList: { $reverseArray: '$toDoList' },
        },
      },
    ]);
    res.json(toDoListByDate);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const createNPush = async (req, res) => {
  const {
    params: { id: projectId },
    // title, content, createdAt
    body,
  } = req;
  try {
    if (!body || !body.title) return res.status(400).end();
    const project = await Project.findOne({
      _id: projectId,
      creator: req.user._id,
    });
    // 찾은 project가 없을 시 project === null
    if (!project) {
      return res.status(400).end();
    }
    const toDo = await ToDo.create(
      Array.isArray(body)
        ? body.map(data => ({
            ...data,
            creator: req.user._id,
            project: projectId,
          }))
        : {
            ...body,
            creator: req.user._id,
            project: projectId,
          },
    );
    console.log(toDo);
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res) => {
  const {
    params: { id: toDoId },
  } = req;
  try {
    await ToDo.findOneAndDelete({
      _id: toDoId,
      creator: req.user._id,
    });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteMany = async (req, res) => {
  const { body: toDoIds } = req;
  try {
    for (let i = 0; i < toDoIds.length; ++i) {
      ToDo.findOneAndDelete({
        _id: toDoIds[i],
        creator: req.user._id,
      }).exec();
    }
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
  // toDoIds.forEach(async toDoId => {
  //   try {
  //     await ToDo.findOneAndDelete({
  //       _id: toDoId,
  //       creator: req.user._id,
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // });
  // res.status(204).end();
};

export const patch = async (req, res) => {
  const {
    params: { id: toDoId },
    // title, content
    body,
  } = req;
  if (!body || !body.title) return res.status(400).end();
  try {
    const toDo = await ToDo.findByIdAndUpdate(toDoId, body, { new: true });
    return res.json(toDo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const complete = async (req, res) => {
  const {
    params: { id: toDoId },
    body: isCompleted,
  } = req;
  if (!isCompleted) return res.status(400).end();
  try {
    const toDo = await ToDo.findByIdAndUpdate(toDoId, isCompleted, {
      new: true,
    });
    return res.json(toDo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
// try {
//   await ToDo.deleteMany({
//     _id: { $in: toDoIds },
//     creator: req.user._id,
//   });
//   return res.status(204).end();
// } catch (err) {
//   console.log(err);
//   return res.status(500).end();
// }
