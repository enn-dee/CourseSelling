import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField, Card } from "@mui/material";
import Typography from "@mui/material/Typography";

function Signup() {
  const [username, setusername] = useState("");
  const [password, setPass] = useState("");
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  };
  const UperStyle = {
    background: "rgba(200, 200, 200, 0.3)",
    padding: "5px",
    borderRadius: "6px",
    color: "black",
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        margin: "1rem 0",
      }}
    >
      <center>
        <Typography variant="h5" style={UperStyle}>
          Welcome to Couresa
        </Typography>
      </center>

      <Card variant="outlined" style={{ width: "400px", padding: "8px" }}>
        <div style={cardStyle}>
          <TextField
            id="username"
            label="username"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setusername(e.target.value);
            }}
          />

          <TextField
            id="password"
            label="Password"
            variant="outlined"
            fullWidth={true}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <Button
          variant="contained"
          size="large"
          style={{ margin: ".8rem 0" }}
          onClick={() => {
            fetch("http://localhost:3000/admin/signup", {
              method: "POST",
              body: JSON.stringify({
                username: username,
                password: password,
              }),
              headers: {
                "Content-type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                localStorage.setItem("token", data.token);
                window.location = "/";
                console.log(data);
              })
              .catch((err) => console.log("error in catch"));
          }}
        >
          SignUp
        </Button>
      </Card>
    </div>
  );
}
export default Signup;
