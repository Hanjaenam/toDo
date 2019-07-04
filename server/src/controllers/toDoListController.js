import ToDoList from 'models/ToDoList';
import Project from 'models/Project';

// onlyPrivate
// onlyProjectCreator
export const readFromProjectPopulate = async (req, res) => {
  // params -> project id , project : project id로 찾은 data
  const {
    locals: { project },
  } = res;
  try {
    const { toDoList } = await project.populate('toDoList').execPopulate();
    res.json(toDoList.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyProjectCreator
export const create = async (req, res) => {
  const {
    locals: { project },
  } = res;
  try {
    const toDoList = await ToDoList.create({ creator: req.user._id });
    project.toDoList.push(toDoList);
    project.save();
    return res.status(200).json(toDoList);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
// onlyPrivate
// onlyProjectCreator
export const deleteOne = async (req, res) => {
  const {
    params: { id },
  } = req;
  const {
    locals: { project },
  } = res;
  try {
    await ToDoList.findByIdAndDelete(id);
    project.toDoList.pull(id);
    project.save();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

const checkCreatorNDelete = idList => {
  let deletedCount = 0;
  idList.forEach(async id => {
    const project = await Project.findOne({ toDoList: id });
    if (String(project.creator) !== String(req.user._id)) return;
    await ToDoList.findByIdAndDelete(id);
    deletedCount += 1;
    project.toDoList.pull(id);
    project.save();
  });
  return deletedCount;
};

// onlyPrivate
// onlyCreator (inner)
export const deleteMany = async (req, res) => {
  const { body: idList } = req;
  try {
    const deletedCount = checkCreatorNDelete(idList);
    return res.status(204).json({ deletedCount });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
