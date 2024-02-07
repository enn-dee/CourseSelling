import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Card } from "@mui/material";
import Typography from "@mui/material/Typography";
function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  return (
    <div style={{ margin: "1rem 0" }}>
      <Card
        variant="outlined"
        style={{
          width: "100%",
          padding: "8px",
        }}
      >
        <TextField
          label="Title"
          variant="outlined"
          fullWidth={true}
          style={{ padding: "7px" }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <TextField
          style={{ padding: "7px" }}
          label="Description"
          variant="outlined"
          fullWidth={true}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          size="large"
          style={{ margin: ".8rem 0" }}
          onClick={() => {
            fetch("http://localhost:3000/admin/courses", {
              method: "POST",
              body: JSON.stringify({
                title: title,
                description: description,
                imageLink: "",
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
              })
              .catch((error) => console.error("Error adding course:", error));
          }}
        >
          Add Course
        </Button>
      </Card>
    </div>
  );
}

export default AddCourse;
