import Project from 'models/Project';
import ToDo from 'models/ToDo';
import mongoose from 'mongoose';

export const readFromProject = async (req, res) => {
  const {
    params: { id: projectId },
    query: { page },
  } = req;
  try {
    const toDo = await ToDo.aggregate([
      {
        $match: {
          creator: req.user._id,
          project: mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          data: {
            $push: {
              title: '$title',
              content: '$content',
              isCompleted: '$isCompleted',
            },
          },
        },
      },
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);
    res.json(toDo);
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
    const project = await Project.find({
      _id: projectId,
      creator: req.user._id,
    });
    // 찾은 project가 없을 시 project === null
    if (!project) {
      return res.status(204).end();
    }
    const toDo = await ToDo.create({
      ...body,
      creator: req.user._id,
      project: project._id,
    });
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
  toDoIds.forEach(async toDoId => {
    try {
      await ToDo.findOneAndDelete({
        _id: toDoId,
        creator: req.user._id,
      });
    } catch (err) {
      throw new Error(err);
    }
  });
  res.status(204).end();
};

export const patch = async (req, res) => {
  const {
    params: { id: toDoId },
    // title, content
    body,
  } = req;
  if (!body || (!body.title && !body.content)) return res.status(400).end();
  try {
    const toDo = await ToDo.findByIdAndUpdate(toDoId, body, { new: true });
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
