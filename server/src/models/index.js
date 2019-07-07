// ToDoListSchema.post('remove', function(doc, next) {
//   // ToDoList.deleteMany()
//   // 다중 삭제되는 지 확인할 것.
//   ToDo.find({ toDoList: doc._id }).remove();
//   Project.findByIdAndUpdate(doc.project, {
//     $pull: { $in: { toDoList: doc._id } },
//   });
//   return next();
// });

// ToDoSchema.post('remove', function(doc, next) {
//   ToDoList.findByIdAndUpdate(doc.toDoList, {
//     $pull: { $in: { toDo: doc._id } },
//   });
//   return next();
// });
