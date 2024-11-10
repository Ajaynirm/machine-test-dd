import mongoose from "mongoose";

const DB_URI = "mongodb+srv://ajaysam397:ajaj@cluster0.edjr7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const startDBServer = async () => {
    try {
      await mongoose.connect(DB_URI, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      console.log("Connected to database");
    } catch (error) {
      console.error("Error connecting to database:", error);
    }
  };

  export default startDBServer;