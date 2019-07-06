import { ToDoList, Project } from 'models';

export const readFromProject = async (req, res) => {
  const {
    params: { projectId },
  } = req;
  try {
    const { toDoList } = await Project.findById(projectId)
      .populate('toDoList')
      .populate('toDo')
      .exec();
    return res.json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const createNPush = async (req, res) => {
  const {
    params: { id: projectId },
  } = req;
  try {
    const project = await Project.findById(projectId).exec();
    if (!project) {
      return res.status(204).end();
    }
    const toDoList = await ToDoList.create({
      project: project._id,
      $push: {
        readable: req.user._id,
        writable: req.user._id,
      },
    });
    return res.json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const deleteOne = async (req, res) => {
  const {
    params: { id: toDoListId },
  } = req;
  try {
    const toDoList = await ToDoList.findById(toDoListId).exec();
    if (String(toDoList.writable) !== String(req.user._id)) {
      return res.status(403).end();
    }
    await toDoList.remove();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
export const deleteMany = async (req, res) => {
  const { body: toDoListIds } = req;
  try {
    await ToDoList.deleteMany({
      _id: { $in: toDoListIds },
      writable: req.user._id,
    }).exec();
    // 삭제된 갯수 리턴해줄 것.
    res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
