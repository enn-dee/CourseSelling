import { Card, Typography, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const navigate = useNavigate();

  const CoursesStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    placeItems: "center",
    justifyContent: "center",
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
            console.log(data.courses);
            setCourses(data.courses);
          });
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <Button
          style={{
            width: "150px",
            margin: "1rem 0",
          }}
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/addcourse");
          }}
        >
          Add Course
        </Button>
      </div>
      <div style={CoursesStyle}>
        {course.map((c) => {
          return (
            <EachCourse
              title={c.title}
              imageLink={c.imageLink}
              description={c.description}
              key={c.id}
            />
          );
        })}
      </div>
    </div>
  );
}
function EachCourse(props) {
  const cardStyle = {
    background:"#3D3B40",
    color:"#FBF9F1",
    display: "grid",
    placeItems: "center",
    maxWidth: "300px",
    width: "100%",
    maxHeight:"400px",
    height:"100%",
    padding: "20px",
    margin: ".5rem",
    gap:"10px",
  };
  const imgStyle = {
    width: "100%",
    height: "150px",
    objectFit: "cover",
  };
  return (
    <Card style={cardStyle}>
      <Typography variant="h4">{props.title}</Typography>
      <Typography variant="p">{props.description}</Typography>
      <img src={props.imageLink} style={imgStyle} />
    </Card>
  );
}

export default Courses;
