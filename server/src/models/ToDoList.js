import mongoose from 'mongoose';
// import ToDo from './ToDo';

export default mongoose.Schema({
  createdAt: {
    type: Date,
    index: {
      unique: false,
    },
    default: new Date().toDateString(),
  },
  toDo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ToDo' }],
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  readable: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  ],
  writable: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  ],
});

// ToDoListSchema.post('remove', function(doc) {
//   ToDo.find({ toDoList: doc._id }).remove();
//   Project.findByIdAndUpdate(doc.project, {
//     $pull: { $in: { toDoList: doc._id } },
//   });
// });

// export default mongoose.model('ToDoList', ToDoListSchema);
