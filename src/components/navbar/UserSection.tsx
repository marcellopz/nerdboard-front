import React from "react";
import { useAuth } from "../../contexts/authContext";
import { Button, Typography, Box } from "@mui/material";

function UserSection() {
  const { authUser, signOutFromWebsite, setOpenSignIn, setOpenSignUp } =
    useAuth();

  return (
    <Box>
      {authUser ? (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography data-testid="display-name">
            {authUser.displayName ?? authUser.email}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={signOutFromWebsite}
            data-testid="logout-button"
          >
            Sign Out
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Button
            data-testid="login-button"
            variant="contained"
            color="secondary"
            onClick={() => setOpenSignIn(true)}
          >
            Sign In
          </Button>
          <Button
            data-testid="signup-button"
            variant="contained"
            color="secondary"
            onClick={() => setOpenSignUp(true)}
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default UserSection;
