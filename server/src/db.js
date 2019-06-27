import config from 'config';
import mongoose from 'mongoose';

mongoose.connect(
  process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false,
  },
);
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

const handleOpen = async () => console.log('✅  Connected to DB');
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

console.log('complete setting db');

db.once('open', handleOpen);
db.on('error', handleError);
