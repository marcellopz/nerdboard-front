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
            Sair
          </Button>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Typography
            data-testid="login-button"
            onClick={() => setOpenSignIn(true)}
            className="flex flex-col justify-center items-center cursor-pointer"
            sx={{
              fontWeight: 500,
            }}
          >
            Fazer Login
          </Typography>
          <Button
            data-testid="signup-button"
            variant="contained"
            color="primary"
            onClick={() => setOpenSignUp(true)}
          >
            Registrar
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default UserSection;
