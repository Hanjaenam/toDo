import { ToDo, ToDoList } from 'models';

export const createNPush = async (req, res) => {
  const {
    params: { id: toDoListId },
    // title, content,
    body,
  } = req;
  try {
    const toDoList = await ToDoList.findById(toDoListId).exec();
    if (!toDoList) {
      return res.status(204).end();
    }
    const toDo = await ToDo.create({
      ...body,
      creator: req.user._id,
      toDoList: toDoList._id,
    });
    res.json(toDo);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteOne = async (req, res) => {
  const {
    params: { id: toDoId },
  } = req;
  try {
    const toDo = await ToDo.findById(toDoId).exec();
    if (String(toDo.creator) !== String(req.user._id)) {
      return res.status(403).end();
    }
    await toDo.remove();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

export const deleteMany = async (req, res) => {
  const { body: toDoIds } = req;
  try {
    await ToDo.deleteMany({
      _id: { $in: toDoIds },
      creator: req.user._id,
    });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const patch = async (req, res) => {
  const {
    params: { id: toDoId },
    // title, content
    body,
  } = req;
  if (!body) return res.status(400).end();
  if (!body.title && !body.content) return res.status(400).end();
  try {
    const toDo = await ToDo.findById(toDoId);
    if (String(toDo.creator) !== String(req.user._id)) {
      return res.status(403).end();
    }
    if (toDo.isCompleted) {
      return res.json({
        message: '이미 완료된 project이므로, 수정이 불가능합니다.',
      });
    }
    // 수정된 데이터가 반환되는 지 확인할 것.
    const patchedToDo = await toDo.update(body);
    return res.json(patchedToDo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
