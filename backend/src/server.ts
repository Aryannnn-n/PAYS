import dotenv from 'dotenv';
dotenv.config({});

import { app } from './app.js';
import { dbConnect } from './utils/dbConfig.js';
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  // Db connect
  dbConnect();
  console.log(`Server running on port ${PORT}`);
});
