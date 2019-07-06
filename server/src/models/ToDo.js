import mongoose from 'mongoose';

export default mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
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
    default: '',
  },
  toDoList: { type: mongoose.Schema.Types.ObjectId, ref: 'ToDoList' },
  creator: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  ],
  readable: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  ],
  writable: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  ],
});

// export default mongoose.model('ToDo', ToDoSchema);
