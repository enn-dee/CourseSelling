import React from "react";
import Button from "@mui/material/Button";
import { TextField, Card, Typography } from "@mui/material";

function SignIn() {
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
        width: "600px",
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
          Welcome Back, Sign In
        </Typography>
      </center>

      <Card variant="outlined" style={{ width: "100%", padding: "8px" }}>
        <div style={cardStyle}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth={true}
          />

          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth={true}
          />
        </div>
        <Button variant="contained" size="large" style={{ margin: ".8rem 0" }}>
          SignIn
        </Button>
      </Card>
    </div>
  );
}
export default SignIn;
