// MongoDB connection utility stub for Next.js API endpoints

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ai-interviewer-coach";

export async function connectToDatabase() {
  // Database connection placeholder
  return {
    connected: true,
    uri: MONGODB_URI,
  };
}
