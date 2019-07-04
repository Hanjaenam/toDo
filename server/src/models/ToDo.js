import mongoose from 'mongoose';

const ToDoSchema = mongoose.Schema({
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
    default: '',
  },
  // auth: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Autho',
  // },
});

export default mongoose.model('ToDoList', ToDoSchema);
