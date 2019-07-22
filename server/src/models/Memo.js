import mongoose from 'mongoose';
import ToDo from 'models/ToDo';
import moment from 'moment';

export const MemoSchema = mongoose.Schema({
  content: { type: String },
  createdAt: {
    type: Date,
    default: moment.now(),
    required: true,
  },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  toDo: { type: mongoose.Schema.Types.ObjectId, ref: 'ToDo' },
});

MemoSchema.post('save', function(doc, next) {
  const { toDo, _id } = doc;
  try {
    console.log('memo save', toDo, _id);
    ToDo.findByIdAndUpdate(toDo, {
      $push: { memo: _id },
    }).exec();
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

MemoSchema.post(/Delete$/, function(doc, next) {
  const { toDo, _id } = doc;
  try {
    ToDo.findByIdAndUpdate(toDo, { $pull: { memo: _id } }).exec();
    return next();
  } catch (err) {
    throw new Error(err);
  }
});

export default mongoose.model('Memo', MemoSchema);
