import mongoose from 'mongoose';

const AuthoSchema = mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    auto: true,
    required: true,
  },
  readable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  writable: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

export default mongoose.model('Autho', AuthoSchema);
