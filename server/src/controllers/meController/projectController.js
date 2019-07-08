import Project from 'models/Project';

// /read
// check
export const readAll = async (req, res) => {
  try {
    const project = await Project.find({ creator: req.user._id }).sort({
      createdAt: -1,
    });
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /create
// check
export const create = async (req, res) => {
  const {
    body: { title },
  } = req;
  try {
    const project = await Project.create({
      title,
      creator: req.user._id,
    });
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /delete/:id
// check
export const deleteOne = async (req, res) => {
  const {
    params: { id: projectId },
  } = req;
  try {
    await Project.findOneAndDelete({
      _id: projectId,
      creator: req.user._id,
    });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// check
export const deleteMany = (req, res) => {
  const { body: projectIds } = req;
  projectIds.forEach(async projectId => {
    // { '$in': [ 5d21994f24c62420f29df3d3 ] } --> 자동으로 배열로 변해지는 듯.
    try {
      await Project.findOneAndDelete({
        _id: projectId,
        creator: req.user._id,
      });
    } catch (err) {
      throw new Error(err);
    }
  });
  res.status(204).end();
};

// /patch
// check -> isCompleted = true 아직 확인 안 함
export const patch = async (req, res) => {
  const {
    params: { id: projectId },
    body,
  } = req;
  try {
    const project = await Project.findOneAndUpdate(
      {
        _id: projectId,
        creator: req.user._id,
      },
      body,
      { new: true },
    );
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /delete
// export const deleteMany = async (req, res) => {
//   const { body: projectIds } = req;
//   try {
//     // { n: 2, ok: 1, deletedCount: 2 }
//     // { n: 0, ok: 1, deletedCount: 0 } -> 실패
//     // _id: projectIds 로도 삭제가 가능했었음.
//     await Project.deleteMany({
//       _id: { $in: projectIds },
//       // $or: [{ creator: req.user._id }, {writable:req.user._id}],
//       creator: req.user._id,
//     }).exec();
//     // if (ok) {
//     //   await User.updateMany(
//     //     { _id: req.user._id },
//     //     { $pullAll: { project: projectIds } },
//     //   ).exec();
//     // }
//     // 삭제된 갯수 리턴해줄 것.
//     res.status(204).end();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).end();
//   }
// };
