import mongoose from 'mongoose';

const ToDoListSchema = mongoose.Schema({
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
    default: Date.now(),
  },
  toDos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDo',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.model('ToDoList', ToDoListSchema);
