import Project from 'models/Project';
import ToDo from 'models/ToDo';
import mongoose from 'mongoose';

export const readAllFromProject = async (req, res) => {
  const {
    params: { id: projectId },
    query: { page },
  } = req;
  try {
    const { title } = await Project.findById(
      mongoose.Types.ObjectId(projectId),
    );
    const toDoListByDate = await ToDo.aggregate([
      {
        $match: {
          creator: req.user._id,
          project: mongoose.Types.ObjectId(projectId),
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
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
      { $skip: (page - 1) * 10 },
      { $limit: 10 },
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
    return res.json({ title, toDoListByDate });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

/**
 * @description [crate]
 * 1. [now~forwardDay] : 생성가능
 * 2. [previousDay] : 생성 불가
 */
export const create = async (req, res) => {
  const {
    params: { id: projectId },
    // title, memo, createdAt
    body,
  } = req;
  try {
    const project = await Project.findOne({
      _id: projectId,
      creator: req.user._id,
    });
    // 찾은 project가 없을 시 project === null
    if (!project) {
      return res.status(400).end();
    }
    const toDo = await ToDo.create(
      Array.isArray(body)
        ? body.map(data => ({
            ...data,
            creator: req.user._id,
            project: projectId,
          }))
        : {
            ...body,
            creator: req.user._id,
            project: projectId,
          },
    );
    return res.json(toDo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const deleteOne = async (req, res) => {
  const {
    params: { id: toDoId },
  } = req;
  try {
    await ToDo.findOneAndDelete({
      _id: toDoId,
      creator: req.user._id,
    });
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};

export const deleteMany = async (req, res) => {
  const { body: toDoIds } = req;
  try {
    // for (let i = 0; i < toDoIds.length; i += 1) {
    //   ToDo.findOneAndDelete({
    //     _id: toDoIds[i],
    //     creator: req.user._id,
    //   }).exec();
    // }
    toDoIds.forEach(toDoId =>
      ToDo.findOneAndDelete({ _id: toDoId, creator: req.user._id }).exec(),
    );
    return res.status(204).end();
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
  // toDoIds.forEach(async toDoId => {
  //   try {
  //     await ToDo.findOneAndDelete({
  //       _id: toDoId,
  //       creator: req.user._id,
  //     });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // });
  // res.status(204).end();
};

/**
 * @description [patch]
 * 1. [now~forward] : 수정가능, 완료가능, 삭제가능
 * 2. [previous~now] : 수정가능, 삭제가능, 완료가능
 * 3. [!isCompleted] : 수정가능, 삭제가능, 완료가능
 * 4. [isCompleted] : 수정가능, 삭제가능, 완료취소가능
 * 5. [all] : 수정하는 데에는 제약 없음.
 */
export const patch = async (req, res) => {
  const {
    params: { id: toDoId },
    // title, memo
    body,
  } = req;
  try {
    //
    // const toDo = ToDo.findByIdAndUpdate(
    //   toDoId,
    //   { ...body },
    //   { new: true },
    // ).exec();
    // console.log(toDo) // Promise { <pending> }
    // // 수정은 정상적으로 완료되었음.
    const toDo = await ToDo.findByIdAndUpdate(
      toDoId,
      { ...body },
      { new: true },
    );
    return res.json(toDo);
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
};
// try {
//   await ToDo.deleteMany({
//     _id: { $in: toDoIds },
//     creator: req.user._id,
//   });
//   return res.status(204).end();
// } catch (err) {
//   console.log(err);
//   return res.status(500).end();
// }
