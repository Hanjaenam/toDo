import mongoose from 'mongoose';

const ToDoListSchema = mongoose.Schema({
  createdAt: {
    type: Date,
    index: {
      unique: false,
    },
    default: Date.now(),
  },
  toDo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ToDo',
    },
  ],
});

export default mongoose.model('toDoList', ToDoListSchema);
