import Project from 'models/Project';
import User from 'models/User';

// onlyPrivate
export const readFromUserPopulate = async (req, res) => {
  try {
    // 맨처음 만들어진 것이 제일 예전 것.
    const { project } = await req.user.populate('project').execPopulate();
    res.json(project.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};
// onlyPrivate
export const create = async (req, res) => {
  const {
    body: { title },
  } = req;
  try {
    const project = await Project.create({ title, creator: req.user._id });
    req.user.project.push(project);
    req.user.save();
    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).end();
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
    await project.delete();
    // $pull : 조건에 만족하는 값을 제거
    // await req.user.updateOne(
    //   { _id: req.user._id },
    //   { $pull: { project: { $in: id } } },
    // );
    req.user.project.pull(id);
    req.user.save();
    res.status(204).end();
  } catch (err) {
    console.log(err);
    res.status(500).end();
  }
};

// onlyPrivate
export const deleteMany = async (req, res) => {
  const { body: idList } = req;
  try {
    await Project.deleteMany({ creator: req.user._id, _id: { $in: idList } });
    // &pullAll 조건이 아니라 값이 일치하는 것을 제거
    await User.updateMany(
      { _id: req.user._id },
      { $pullAll: { project: idList } },
    );
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
