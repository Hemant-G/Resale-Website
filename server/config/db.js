import mongoose from 'mongoose';
import 'dotenv/config'

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.DB_URI);
  console.log('Connected to MongoDB database!');
}
