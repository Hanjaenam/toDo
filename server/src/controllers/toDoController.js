import ToDo from 'models/ToDo';
import ToDoList from 'models/toDoList';

// onlyPrivate
export const readAll = async (req, res) => {
  try {
    const toDoList = await ToDoList.find({ creator: req.user._id })
      .populate('toDo')
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.json(toDoList);
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
