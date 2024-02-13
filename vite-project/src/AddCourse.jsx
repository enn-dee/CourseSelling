import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { RecoilRoot, atom, useRecoilState } from "recoil";

function AddCourse() {
  const navigate = useNavigate();

  const [title, setTitle] = useRecoilState(TitleState);
  const [description, setDescription] = useRecoilState(DescriptionState);
  const [image, setImg] = useRecoilState(ImageState);

  const fieldStyle = {
    padding: "7px",
    maxWidth: "400px",
  };

  return (
    <RecoilRoot>
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
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <TextField
            style={fieldStyle}
            label="Image Link"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => setImg(e.target.value)}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              size="large"
              style={{ margin: ".8rem 0", maxWidth: "400px" }}
              onClick={() => {
                if (description == "" || image == " " || title == " ") {
                  alert("All fields are Required");
                } else {
                  fetch("http://localhost:3000/admin/courses", {
                    method: "POST",
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
                      // console.log("Course Added", data);
                      alert("Course Added");
                    })
                    .catch((error) =>
                      console.error("Error adding course:", error)
                    );
                }
              }}
            >
              Add Course
            </Button>
            <Button
              style={{ margin: ".8rem 0", maxWidth: "400px" }}
              variant="contained"
              onClick={() => {
                navigate("/courses");
              }}
              size="large"
            >
              Courses
            </Button>
          </div>
        </Card>
      </div>
    </RecoilRoot>
  );
}

export default AddCourse;
const DescriptionState = atom({
  key: "DescriptionState",
  default: "",
});
const TitleState = atom({
  key: "TitleState",
  default: "",
});
const ImageState = atom({
  key: "ImageState",
  default: "",
});
