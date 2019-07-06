import { Project } from 'models';

// /read
export const readAll = async (req, res) => {
  try {
    const project = await Project.find({ creator: req.user._id }).exec();
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /create
export const create = async (req, res) => {
  const {
    body: { title },
  } = req;
  try {
    const project = await Project.create({
      title,
      $push: { creator: req.user._id },
    });
    req.user.project.push(project);
    await req.user.save();
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /delete/:id
export const deleteOne = async (req, res) => {
  const {
    params: { id: projectId },
  } = req;
  try {
    const project = await Project.findById(projectId);
    if (String(project.creator) !== String(req.user._id)) {
      return res.status(403).end();
    }
    await project.remove();
    req.user.project.pull(projectId);
    await req.user.save();
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /delete
export const deleteMany = async (req, res) => {
  const { body: projectIds } = req;
  try {
    // _id: projectIds 로도 삭제가 가능했었음.
    await Project.deleteMany({
      _id: { $in: projectIds },
      // $or: [{ creator: req.user._id }, {writable:req.user._id}],
      creator: req.user._id,
    }).exec();
    // if (ok) {
    //   await User.updateMany(
    //     { _id: req.user._id },
    //     { $pullAll: { project: projectIds } },
    //   ).exec();
    // }
    // 삭제된 갯수 리턴해줄 것.
    res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /patch
export const patch = async (req, res) => {
  const {
    params: { id: projectId },
    body,
  } = req;
  try {
    const project = await Project.findById(projectId);
    if (String(project.creator) !== String(req.user._id)) {
      return res.status(403).end();
    }
    if (project.isCompleted) {
      return res.json({
        message: '이미 완료된 project이므로, 수정이 불가능합니다.',
      });
    }
    // 수정된 데이터가 반환되는 지 확인할 것.
    const patchedProject = await project.update(body);
    return res.json(patchedProject);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
