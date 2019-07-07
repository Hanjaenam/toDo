import Project from 'models/Project';
import User from 'models/User';

export const readAll = async (req, res) => {
  try {
    const project = await Project.find({
      $or: [{ creator: req.user._id }, { readable: req.user._id }],
    }).exec();
    res.json(project);
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
    const project = await Project.findOne({
      _id: id,
      $or: [
        {
          creator: req.user._id,
          readble: req.user._id,
        },
      ],
    }).exec();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const create = async (req, res) => {
  const { body } = req;
  try {
    const project = await Project.create({
      creator: req.user._id,
      ...body,
    });
    req.user.project.push(project);
    await req.user.save();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const { ok } = await Project.deleteOne({
      _id: id,
      $or: [{ creator: req.user._id, wrtiable: req.user._id }],
    }).exec();
    if (ok) {
      req.user.project.pull(id);
      await req.user.save();
    }
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteMany = async (req, res) => {
  const { body: idList } = req;
  try {
    // _id: idList 로도 삭제가 가능했었음.
    const { ok } = await Project.deleteMany({
      _id: { $in: idList },
      $or: [{ creator: req.user._id, wrtiable: req.user._id }],
    }).exec();
    if (ok) {
      await User.updateMany(
        { _id: req.user._id },
        { $pullAll: { project: idList } },
      ).exec();
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
    const project = await Project.findOneAndUpdate(
      {
        _id: id,
        isCompleted: false,
        $or: [{ creator: req.user._id, writable: req.user._id }],
      },
      body,
      { new: true },
    ).exec();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
