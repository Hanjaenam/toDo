import ToDo from 'models/ToDo';

export const onlyToDoCreator = async (req, res, next) => {
  const {
    params: { id },
  } = req;
  try {
    const toDo = await ToDo.findById(id);
    if (toDo.creator !== req.user._id) {
      return res.status(204).end();
    }
    res.locals.toDo = toDo;
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const onlyNotCompleted = async (req, res, next) => {
  const {
    locals: { toDo },
  } = res;
  try {
    if (toDo.isCompleted) {
      return res.status(400).end();
    }
    return next();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
