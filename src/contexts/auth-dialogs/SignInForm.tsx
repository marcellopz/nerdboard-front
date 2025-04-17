import React from "react";
import { TextField, Box } from "@mui/material";
import CustomDialog from "./Dialog";
import { useAuth } from "../authContext";

type SignInFormProps = {
  open: boolean;
  onClose: () => void;
};

const SignInForm: React.FC<SignInFormProps> = ({ open, onClose }) => {
  const { signInEmailPwd } = useAuth();
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });
  const [error, setError] = React.useState<string | null>(null);

  function handleSubmit() {
    signInEmailPwd(formState.email, formState.password)
      .then((userCredential) => {
        onClose();
      })
      .catch((error) => {
        console.error("Error signing in:", error);
        setError("Email ou senha inválidos.");
      });
  }

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Fazer Login"
      onConfirm={handleSubmit}
      confirmText="Entrar"
      confirmEnabled={formState.email !== "" && formState.password !== ""}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& .MuiTextField-root": { my: 1, width: "300px" },
        }}
        noValidate
        autoComplete="off"
        data-testid="login-form"
      >
        <TextField
          required
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          autoComplete="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          slotProps={{
            htmlInput: {
              "data-testid": "email-field",
            },
          }}
        />
        <TextField
          required
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          slotProps={{
            htmlInput: {
              "data-testid": "password-field",
            },
          }}
        />
        {error && (
          <Box sx={{ color: "red", mt: 1 }} data-testid="error-message">
            {error}
          </Box>
        )}
      </Box>
    </CustomDialog>
  );
};

export default SignInForm;
