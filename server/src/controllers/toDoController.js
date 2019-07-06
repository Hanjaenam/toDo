import ToDo from 'models/ToDo';
import Project from 'models/Project';

export const readAll = async (req, res) => {
  try {
    const toDo = await ToDo.find({ creator: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const readOne = async (req, res) => {
  const {
    prams: { id },
  } = req;
  try {
    const toDo = await ToDo.findOne({ _id: id, creator: req.user._id }).exec();
    // 최신순으로 정렬할 것.
    console.log(typeof toDo);
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const readFromProject = async (req, res) => {
  const {
    params: { id: projectId },
  } = req;
  try {
    const { toDo } = await Project.findById(projectId)
      .populate('toDo')
      .exec();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const create = async (req, res) => {
  const {
    body: { toDoData, projectId },
  } = req;
  try {
    const toDo = await ToDo.create({ creator: req.user._id, ...toDoData });
    await Project.findByIdAndUpdate(projectId, {
      $push: { toDos: toDo },
    }).exec();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res) => {
  const {
    params: { id },
    body: projectId,
  } = req;
  try {
    const { ok } = await ToDo.deleteOne({
      _id: id,
      creator: req.user._id,
    }).exec();
    if (ok) {
      await Project.findByIdAndUpdate(projectId, {
        $pull: { toDos: { $in: id } },
      }).exec();
    }
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteMany = async (req, res) => {
  const {
    body: { idList, projectId },
  } = req;
  try {
    const { ok } = await ToDo.deleteMany({
      _id: { $in: idList },
      creator: req.user._id,
    }).exec();
    if (ok) {
      await Project.findByIdAndUpdate(projectId, {
        $pullAll: { toDos: idList },
      }).exec();
    }
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const patch = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const toDo = await ToDo.findByIdAndUpdate(
      id,
      { ...body },
      { new: true },
    ).exec();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
