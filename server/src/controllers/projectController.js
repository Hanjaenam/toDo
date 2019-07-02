import Project from 'models/Project';

// onlyPrivate
export const readAll = async (req, res) => {
  try {
    const project = await Project.find({ creator: req.user._id })
      .sort({
        createdAt: -1,
      })
      .limit(10);
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
export const add = async (req, res) => {
  const {
    body: { title },
  } = req;
  try {
    const project = await Project.create({ title, creator: req.user._id });
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
// onlyCreator
export const deleteOne = async (req, res) => {
  const {
    locals: { project },
  } = res;
  try {
    await project.delete();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
export const deleteMany = async (req, res) => {
  const { body } = req;
  try {
    await Project.deleteMany({ creator: req.user._id, _id: { $in: body } });
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
    locals: { project },
  } = res;
  try {
    // 이미 완료된 toDo는 수정할 수 없습니다.
    project.title = title;
    await project.save();
    res.json(project);
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
    locals: { project },
  } = res;
  try {
    project.isCompleted = true;
    project.completedAt = Date.now();
    await project.save();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
