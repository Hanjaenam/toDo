import Project from 'models/Project';
import ToDo from 'models/ToDo';
import mongoose from 'mongoose';
import config from 'config';
// /read
// check
export const readAll = async (req, res) => {
  const {
    query: { sort = 'latest', page = 1, q = '' },
  } = req;
  try {
    const projectCount = await Project.find().countDocuments();
    const search =
      q === '' ? undefined : { title: { $regex: q, $options: 'i' } };
    const project = await Project.find({ ...search, creator: req.user._id })
      .skip((page - 1) * config.PAGE.LIMIT)
      .limit(config.PAGE.LIMIT)
      .sort(sort === 'latest' ? { createdAt: -1 } : { importance: -1 })
      .lean();
    res.set('Last-Page', Math.ceil(projectCount / config.PAGE.LIMIT));
    res.set('Page-Limit', config.PAGE.LIMIT);
    return res.json(project);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const readOne = async (req, res) => {
  const {
    params: { title: projectTitle },
    query: { page },
  } = req;
  try {
    const project = await Project.findOne({
      creator: req.user._id,
      title: projectTitle,
    });
    // No need to lean pipeline output . Aggregate output is already lean
    const toDoListGroupByDate = await ToDo.aggregate([
      {
        $match: {
          creator: req.user._id,
          project: project._id,
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt',
              timezone: 'Asia/Seoul',
            },
          },
          toDoList: {
            $push: {
              _id: '$_id',
              title: '$title',
              memo: '$memo',
              isCompleted: '$isCompleted',
              createdAt: '$createdAt',
              creator: '$creator',
            },
          },
        },
      },
      { $skip: (page - 1) * config.PAGE.LIMIT },
      { $limit: config.PAGE.LIMIT },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          toDoList: { $reverseArray: '$toDoList' },
        },
      },
    ]);
    return res.json({ project, toDoListGroupByDate });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

// /create
// check
export const create = async (req, res) => {
  const {
    body: { title, isPublic, importance },
  } = req;
  try {
    const project = await Project.create({
      title,
      isPublic,
      importance,
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
// export const deleteMany = (req, res) => {
//   const { body: projectIds } = req;
//   try {
//     // for (let i = 0; i < projectIds.length; i += 1) {
//     //   Project.findOneAndDelete({
//     //     _id: projectIds[i],
//     //     creator: req.user._id,
//     //   }).exec();
//     // }
//     projectIds.forEach(projectId =>
//       Project.findOneAndDelete({
//         _id: projectId,
//         creator: req.user._id,
//       }).exec(),
//     );
//     return res.status(204).end();
//   } catch (err) {
//     console.log(err);
//     return res.status(500).end();
//   }
//   // projectIds.forEach(async projectId => {
//   //   // { '$in': [ 5d21994f24c62420f29df3d3 ] } --> 자동으로 배열로 변해지는 듯.
//   //   try {
//   //     Project.findOneAndDelete({
//   //       _id: projectId,
//   //       creator: req.user._id,
//   //     }).exec();
//   //   } catch (err) {
//   //     throw new Error(err);
//   //   }
//   // });
//   // res.status(204).end();
// };

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
    ).lean();
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
