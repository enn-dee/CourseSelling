import { Card, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

function Course() {
  // const [course, setCourses] = useState([]);
  const navigate = useNavigate();

  const { courseId } = useParams();
  const setCourses = useSetRecoilState(coursesState);
  console.log("course component");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/courses", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setCourses(data.courses);
          });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem 0",
      }}
    >
      <CourseCard courseId={courseId} />;
      <UpdateCard courseId={courseId} />;
    </div>
  );
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState("");
  const [courses, setCourses] = useRecoilState(coursesState);
  // const course = props.isCourse;
  console.log("Update component");
  const fieldStyle = {
    padding: "7px",
    maxWidth: "400px",
  };
  return (
    <div
      style={{
        width: "400px",
        margin: "1rem 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        variant="outlined"
        style={{
          width: "100%",
          padding: "8px",
          maxWidth: "400px",
        }}
      >
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/addcourse");
          }}
        >
          Add Course
        </Button>
        <Typography variant="h4">Update Course Details</Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth={true}
          style={fieldStyle}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          style={fieldStyle}
          label="Description"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          style={fieldStyle}
          label="Image Link"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => setImg(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          style={{ margin: ".8rem 0", maxWidth: "400px" }}
          onClick={() => {
            fetch("http://localhost:3000/admin/courses/" + props.courseId, {
              method: "PUT",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: image,
                published: true,
              }),
              headers: {
                "Content-type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
              })
              .then((data) => {
                console.log("Course Added", data);
                let updatedCourse = [];

                for (let i = 0; i < courses.length; i++) {
                  if (courses[i].id == props.courseId) {
                    updatedCourse.push({
                      id: props.courseId,
                      title: title,
                      description: description,
                      imageLink: image,
                    });
                  } else {
                    updatedCourse.push(courses[i]);
                  }
                }
                setCourses(updatedCourse);
              })
              .catch((error) => console.error("Error adding course:", error));
          }}
        >
          Update Course
        </Button>
      </Card>
    </div>
  );
}

function CourseCard(props) {
  console.log("course Card component");
  const cardStyle = {
    display: "grid",
    placeItems: "center",
    maxWidth: "300px",
    width: "100%",
    padding: "12px",
    margin: ".5rem",
    maxHeight: "400px",
    height: "100%",
  };
  const imgStyle = {
    width: "200px",
    height: "150px",
    objectFit: "cover",
  };

  //const isCourse = props.isCourse;
  const courses = useRecoilValue(coursesState);
  let course = null;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id == props.courseId) {
      course = courses[i];
    }
  }
  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Card style={cardStyle}>
      <Typography variant="h4">{course.title}</Typography>
      <Typography variant="p">{course.description}</Typography>
      <img src={course.imageLink} style={imgStyle} />
    </Card>
  );
}
export default Course;

const coursesState = atom({
  key: "coursesState", // unique ID (with respect to other atoms/selectors)
  default: "", // default value (aka initial value)
});
