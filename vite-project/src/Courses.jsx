import { Card, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

function Courses() {
  const CoursesStyle = {
    display: "flex",
    // flexDirection: "column",
    flexWrap: "wrap",
    placeItems: "center",
    justifyContent: "center",
    // maxWidth:"400px"
  };

  const [course, setCourses] = useState([]);

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
    <div style={CoursesStyle}>
      {course.map((c) => {
        return (
          <EachCourse
            title={c.title}
            description={c.description}
            key={c.id}
            imgLink={c.imageLink}
          />
        );
      })}
    </div>
  );
}
function EachCourse(props) {
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
  return (
    <Card style={cardStyle}>
      <Typography variant="h4">{props.title}</Typography>
      <Typography variant="p">{props.description}</Typography>
      <img src={props.imgLink} style={imgStyle} />
    </Card>
  );
}

export default Courses;
