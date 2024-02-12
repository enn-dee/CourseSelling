require("dotenv").config();
const express = require("express");

const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/default";

const app = express();
const cors = require("cors");

const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoute);
app.use("/user", userRoute);

// connect to db
async function connectDB() {
  try {
    const connect = await mongoose.connect(dbUrl, {
      //  dbName: "courses",
    });
    console.log("Connected to DB");
  } catch {
    console.log("Failed to connnect to DB");
  }
}
connectDB();

app.listen(port, () => console.log("Server running on port 3000"));
