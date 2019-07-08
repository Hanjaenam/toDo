import mongoose from 'mongoose';
import Project from 'models/Project';

export const ToDoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  const { project, _id } = doc;
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

ToDoSchema.pre(/Update$/, function(next) {
  if (this.isCompleted) {
    throw new Error('이미 완료된 to do 입니다.');
  }
  return next();
});

export default mongoose.model('ToDo', ToDoSchema);
