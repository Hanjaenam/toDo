import mongoose from 'mongoose';
import moment from 'moment';
import User from './User';
import ToDo from './ToDo';

const ProjectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
    index: {
      unique: false,
    },
    default: '',
  },
  createdAt: {
    type: Date,
    index: {
      unique: false,
    },
    default: moment.now(),
  },
  importance: {
    type: Number,
    max: 3,
    default: 1,
  },
  toDo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDo',
    },
  ],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isPublic: { type: Boolean, default: true },
  readable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  writable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

/**
 * @description create에도 작동됨
 * 1. doc, this 동일한 데이터
 * 2. findUpdate할 경우에도 들어오지 않는다.
 Ex ) ToDoData : { isCompleted: false,
  completedAt: null,
  creator: [ 5d218e778b8bdd1db468f3c0 ],
  readable: [],
  writable: [],
  _id: 5d21bc35c2ec45353e8afd95,
  title: 'efsef',
  __v: 0 } -> doc, this ( )
 */
// 안 될 경우 "async" 붙일 것
ProjectSchema.post('save', function(doc, next) {
  // exec() -> async 필수!
  const { creator, _id } = doc;
  try {
    // await User.findByIdAndUpdate(creator, {
    //   $push: { project: _id },
    // });
    User.findByIdAndUpdate(creator, {
      $push: { project: _id },
    }).exec();
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

// 안 될 경우 "async" 붙일 것
ProjectSchema.post(/Delete$/, function(doc, next) {
  try {
    const { creator, _id, toDo } = doc;
    // await User.findByIdAndUpdate(creator, {
    //   $pull: { project: _id },
    // });
    User.findByIdAndUpdate(creator, {
      $pull: { project: _id },
    }).exec();
    toDo.forEach(({ _id }) => ToDo.findByIdAndDelete(_id).exec());
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

// isCompleted === true 이면 막는다.
// pre('save') 로는 findUpdate로 안됩니다.
// ProjectSchema.pre(/Update$/, function(next) {
//   if (this.isCompleted) {
//     throw new Error('이미 완료된 Project입니다.');
//   }
//   return next();
// });

export default mongoose.model('Project', ProjectSchema);

// ProjectSchema.post(/deleteOne/, async function(doc, next) {
//   const { ok, n } = doc;
//   const { creator, _id } = this._conditions;
//   if (ok && n === 1) {
//     User.findByIdAndUpdate(creator, { $pull: { project: _id } }).exec();
//   }
//   return next();
// });

// ProjectSchema.post('remove', async function(doc, next) {
//   try {
//     // ToDoList.deleteMany()
//     // 다중 삭제되는 지 확인할 것.
//     console.log(doc);
//     await User.updateOne({
//       _id: doc.creator,
//       $pull: { project: doc._id },
//     });
//     await ToDoList.remove({ project: doc._id });
//     console.log('remove');
//     return next();
//   } catch (err) {
//     throw new Error(err);
//   }
// });
