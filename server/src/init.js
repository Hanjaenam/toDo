import app from './app';
import initDB from './db';

initDB();
const PORT = process.env.PORT || 4000;
const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT}`);

app.listen(PORT, handleListening);
