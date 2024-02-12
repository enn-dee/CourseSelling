const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { User, Admin, Course } = require("../db/index");

const jwt = require("jsonwebtoken");
// mongoose schemas

//console.log(ADMINS);
const SECRET = "my-secret-key";

// Admin routes
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username: username, password: password });
    newAdmin.save();

    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });

  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/me", authenticateJwt, (req, res) => {
  res.status(200).json({ username: req.user.username });
});

router.post("/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();

  res.json({ message: "Course created successfully", courseId: course.id });
});

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  });
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses: courses });
});
