import ToDo from 'models/ToDo';

// onlyPrivate
// onlyListCreator
export const add = async (req, res) => {
  const { title, content } = req;
  const {
    locals: { toDoList },
  } = res;
  try {
    const toDo = await ToDo.create({ title, content, creator: req.user._id });
    toDoList.toDos.push(toDo.id);
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
export const remove = async (req, res) => {
  const {
    locals: { toDo },
  } = res;
  try {
    await toDo.remove();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
// onlyNotCompleted
export const patch = async (req, res) => {
  const {
    body: { title, content },
  } = req;
  const {
    locals: { toDo },
  } = res;
  try {
    res.title = title;
    res.content = content;
    await res.save();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const completed = async (req, res) => {
  const {
    locals: { toDo },
  } = res;
  try {
    toDo.isCompleted = true;
    toDo.completedAr = Date.now();
    await toDo.save();
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
