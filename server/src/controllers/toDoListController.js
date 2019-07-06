import ToDoList from 'models/ToDoList';
import Project from 'models/Project';

export const readAll = async (req, res) => {
  try {
    const toDoList = await ToDoList.find({
      $or: [
        {
          creator: req.user._id,
          readable: req.user._id,
        },
      ],
    }).exec();
    res.json(toDoList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const readOne = async (req, res) => {
  try {
    const toDoList = await ToDoList.findOne({
      $or: [
        {
          creator: req.user._id,
          readable: req.user._id,
        },
      ],
    }).exec();
    res.json(toDoList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
export const create = async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const project = await Project.findOne({ _id: id, creator: req.user._id });
    const toDoList = await ToDoList.create({
      $push: { creator: req.user._id },
      ...body,
    });
    res.json(toDoList);
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
  } catch (err) {}
};
