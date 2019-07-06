import mongoose from 'mongoose';
// import User from './User';
// import ToDoList from './ToDoList';

export default mongoose.Schema({
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
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
});

// ProjectSchema.post('remove', function(doc) {
//   // ToDoList.deleteMany()
//   // 다중 삭제되는 지 확인할 것.
//   ToDoList.find({ project: doc._id }).remove();
//   User.findByIdAndUpdate(doc.creator, { $pull: { $in: { project: doc._id } } });
// });

// export default mongoose.model('Project', ProjectSchema);
