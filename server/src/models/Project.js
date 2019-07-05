import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
    default: Date.now(),
  },
  importance: {
    type: Number,
    max: 5,
    default: 0,
  },
  toDoList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDoList',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // auth: {
  // type: mongoose.Schema.Types.ObjectId,
  // ref: 'Autho',
  // },
});

export default mongoose.model('Project', projectSchema);
