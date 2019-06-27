import ToDoList from 'models/ToDoList';

// onlyPrivate
export const add = async (req, res) => {
  const {
    body: { title },
  } = req;
  try {
    const toDoList = await ToDoList.create({ title, creator: req.user._id });
    res.json(toDoList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
export const remove = async (req, res) => {
  const {
    locals: { toDoList },
  } = res;
  try {
    await toDoList.remove();
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
    body: { title },
  } = req;
  const {
    locals: { toDoList },
  } = res;
  try {
    // 이미 완료된 toDo는 수정할 수 없습니다.
    toDoList.title = title;
    await toDoList.save();
    res.json(toDoList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
// onlyNotCompleted
export const completed = async (req, res) => {
  const {
    locals: { toDoList },
  } = res;
  try {
    toDoList.isCompleted = true;
    toDoList.completedAt = Date.now();
    await toDoList.save();
    res.json(toDoList);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
