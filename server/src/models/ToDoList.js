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
  // auth: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Autho',
  // },
});

ToDoListSchema.pre('save', next => {
  if (Date(this.createdAt).split(' ')[0] === Date(Date.now()).split(' ')[0]) {
    throw Error('오늘의 할 일 묵록은 이미 생성되어있습니다.');
  }
  return next();
});

export default mongoose.model('toDoList', ToDoListSchema);
