import mongoose from 'mongoose';
import UserSchema from './User';
import ProjectSchema from './Project';
import ToDoListSchema from './ToDoList';
import ToDoSchema from './ToDo';

export const User = mongoose.model('User', UserSchema);
export const Project = mongoose.model('Project', ProjectSchema);
export const ToDoList = mongoose.model('ToDoList', ToDoListSchema);
export const ToDo = mongoose.model('ToDo', ToDoSchema);

ProjectSchema.post('remove', function(doc) {
  // ToDoList.deleteMany()
  // 다중 삭제되는 지 확인할 것.
  ToDoList.find({ project: doc._id }).remove();
  User.findByIdAndUpdate(doc.creator, { $pull: { $in: { project: doc._id } } });
});

ToDoListSchema.post('remove', function(doc) {
  // ToDoList.deleteMany()
  // 다중 삭제되는 지 확인할 것.
  ToDo.find({ toDoList: doc._id }).remove();
  Project.findByIdAndUpdate(doc.project, {
    $pull: { $in: { toDoList: doc._id } },
  });
});

ToDo.post('remove', function(doc) {
  ToDoList.findByIdAndUpdate(doc.toDoList, {
    $pull: { $in: { toDo: doc._id } },
  });
});
