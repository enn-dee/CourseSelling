import { Card, Typography, TextField, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Course() {
  const [course, setCourses] = useState([]);
  const { courseId } = useParams();

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

  let isCourse = null;
  for (let i = 0; i < course.length; i++) {
    if (course[i].id == courseId) {
      isCourse = course[i];
    }
  }
  if (!isCourse) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CourseCard isCourse={isCourse} />;
      <UpdateCard
        isCourse={isCourse}
        setCourses={setCourses}
        courses={course}
      />
      ;
    </div>
  );
}

function UpdateCard(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImg] = useState("");
  const course = props.isCourse;

  const fieldStyle = {
    padding: "7px",
    maxWidth: "400px",
  };
  return (
    <div
      style={{
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
            fetch("http://localhost:3000/admin/courses/" + course.id, {
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
                for (let i = 0; i < props.courses.length; i++) {
                  if (props.courses[i].id == course.id) {
                    updatedCourse.push({
                      id: course.id,
                      title: title,
                      description: description,
                      imageLink: image,
                    });
                  } else {
                    updatedCourse.push(props.courses[i]);
                  }
                }
                props.setCourses(updatedCourse);
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

  const isCourse = props.isCourse;
  return (
    <Card style={cardStyle}>
      <Typography variant="h4">{isCourse.title}</Typography>
      <Typography variant="p">{isCourse.description}</Typography>
      <img src={isCourse.imageLink} style={imgStyle} />
    </Card>
  );
}
export default Course;
