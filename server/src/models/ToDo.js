import mongoose from 'mongoose';
import Project from 'models/Project';
import moment from 'moment';
import Memo from 'models/Memo';

export const ToDoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  memo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Memo' }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  readable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  writable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// create 다중 추가일 경우 그 개수만큼 호출됨
// 안 될 경우 "async" 붙일 것
ToDoSchema.post('save', function(doc, next) {
  const { project, _id, createdAt } = doc;
  const now = Number(moment(Date.now()).format('YYYYMMDD'));
  if (now > Number(moment(createdAt).format('YYYYMMDD')))
    throw new Error('previous to do');
  try {
    // await Project.findByIdAndUpdate(project, {
    //   $push: { toDo: _id },
    // })
    Project.findByIdAndUpdate(project, {
      $push: { toDo: _id },
    }).exec();
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

// 안 될 경우 "async" 붙일 것
ToDoSchema.post(/Delete$/, function(doc, next) {
  const { project, _id, memo } = doc;
  try {
    // await Project.findByIdAndUpdate(project._id, {
    //   $pull: { toDo: _id },
    // });
    Project.findByIdAndUpdate(project._id, {
      $pull: { toDo: _id },
    }).exec();
    memo.forEach(({ _id }) => Memo.findByIdAndDelete(_id).exec());
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

export default mongoose.model('ToDo', ToDoSchema);
