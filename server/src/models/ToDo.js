import mongoose from 'mongoose';
import Project from 'models/Project';
import moment from 'moment';

export const ToDoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  content: {
    type: String,
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
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  readable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  writable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// create 다중 추가일 경우 그 개수만큼 호출됨
ToDoSchema.post('save', async function(doc, next) {
  const { project, _id, createdAt } = doc;
  const now = Number(moment(Date.now()).format('YYYYMMDD'));
  if (now > Number(moment(createdAt).format('YYYYMMDD')))
    throw new Error('previous to do');
  try {
    await Project.findByIdAndUpdate(project, {
      $push: { toDo: _id },
    });
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

ToDoSchema.post(/Delete$/, async function(doc, next) {
  const { project, _id } = doc;
  try {
    await Project.findByIdAndUpdate(project._id, {
      $pull: { toDo: _id },
    });
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

export default mongoose.model('ToDo', ToDoSchema);
