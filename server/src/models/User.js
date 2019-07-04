import crypto from 'crypto';
import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  email: { type: String, required: true },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    index: {
      unique: false,
    },
    default: Date.now,
  },
  project: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
    },
  ],
});

UserSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hash = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

UserSchema.method('encryptPassword', function(password) {
  return crypto
    .createHmac('sha1', this.salt)
    .update(password)
    .digest('hex');
});
UserSchema.method('makeSalt', function() {
  return `${Math.round(new Date().valueOf() * Math.random())}`;
});
UserSchema.method('authenticate', function(password, hash) {
  return this.encryptPassword(password) === this.hash;
});

// const isValid = (password) => {

// }
// UserSchema.pre('save', function(next) {
//   if (!this.isNew) return next();

//   if (!isValid(this.password)) {
//     next(new Error('유효하지 않은 password 필드입니다.'));
//   } else {
//     next();
//   }
// });
UserSchema.path('email').validate(email => {
  const regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  return regex.test(email);
});

UserSchema.static('findAll', function(cb) {
  return this.find({}, cb);
});
UserSchema.static('findByEmail', function(email, cb) {
  return this.findOne({ email }, cb);
});
export default mongoose.model('User', UserSchema);
