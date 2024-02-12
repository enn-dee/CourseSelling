const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Types.ObjectId, ref: "Course" }],
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = {
  User,
  Admin,
  Course,
};
