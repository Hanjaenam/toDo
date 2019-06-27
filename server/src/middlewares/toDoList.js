import ToDoList from 'models/ToDoList';

export const onlyCreator = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const toDoList = await ToDoList.findById(id);
    if (toDoList.creator !== req.user._id) {
      return res.status(403).end();
    }
    res.locals.toDoList = toDoList;
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const onlyNotCompleted = async (req, res, next) => {
  const {
    locals: { toDoList },
  } = res;
  try {
    if (toDoList.isCompleted) {
      return res.status(400).end();
    }
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
