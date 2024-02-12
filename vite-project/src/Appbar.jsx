import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/me", {
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setUserEmail(res.data.username))
      .catch((e) => {
        console.log("error in catch block: ", e);
      });
  }, []);
  if (userEmail) {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "4px",
          background: "#ffee",
        }}
      >
        <div>
          <Typography>Couresa</Typography>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>{userEmail}</div>
          <Button
            variant="contained"
            onClick={() => {
              localStorage.setItem("token", null);
              window.location = "/signup";
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "4px",
          background: "#ffee",
        }}
      >
        <div>
          <Typography>Couresa</Typography>
        </div>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign Up
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Sign In
          </Button>
        </div>
      </div>
    );
  }
}

export default Appbar;
