import mongoose from 'mongoose';

const dbConnect = async function () {
  try {
    await mongoose.connect(process.env.DB_URl as string);
    console.log('Db Connected ✅');
  } catch (error) {
    console.log('Db Connection Error ❌');
    console.log(error);
  }
};

export { dbConnect };
