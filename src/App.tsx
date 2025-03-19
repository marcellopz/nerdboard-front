import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import AppRoutes from "./routes/routes";
import { theme } from "./config/themeOptions";

function App() {
  // const { idToken } = useAuth();
  // const { connectSocket, disconnectSocket } = useSocketStore();

  // useEffect(() => {
  //   if (idToken) {
  //     connectSocket(idToken);
  //     return () => disconnectSocket();
  //   } else {
  //     disconnectSocket();
  //   }
  // }, [idToken]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor: theme.palette.background.default,
          },
        }}
      />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
