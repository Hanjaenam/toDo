import ToDo from 'models/ToDo';
import ToDoList from 'models/ToDoList';

// onlyPrivate
// onlyProjectCreator
export const readFromToDoListPopulate = async (req, res) => {
  const {
    locals: { toDoList },
  } = res;
  try {
    const { toDo } = await toDoList.populate('toDo').execPopulate();
    res.json(toDo.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyProjectCreator
export const add = async (req, res) => {
  const {
    body: { title, content, createdAt },
  } = req;
  const {
    locals: { project },
  } = res;
  try {
    let toDoList = await ToDoList.findOne({ createdAt });
    const toDo = await ToDo.create({
      title,
      content,
      creator: req.user._id,
    });
    if (toDoList) {
      toDoList.toDo.push(toDo.id);
    } else {
      toDoList = await ToDoList.create({ createdAt });
      toDoList.toDo.push(toDo);
    }
    project.toDoList.push(toDo.id);
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
export const deleteOne = async (req, res) => {
  const {
    locals: { toDo },
  } = res;
  try {
    await toDo.delete();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyToDoCreator
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

// onlyPrivate
// onlyToDoCreator
// onlyNotCompleted
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
