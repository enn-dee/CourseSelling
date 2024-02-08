import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
("react-router-dom");
import React, { useEffect, useState } from "react";

import "./App.css";
import Signup from "./Signup";
import Appbar from "./Appbar";
import SignIn from "./SignIn";
import AddCourse from "./AddCourse";
import Courses from "./Courses";
import Course from "./Course";

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#eeeeee",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        // alignItems: "center",
        color: "black",
      }}
    >
      <RecoilRoot>
        <Router>
          <Appbar></Appbar>
          <Routes>
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="signup" element={<Signup />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  );
}

export default App;
