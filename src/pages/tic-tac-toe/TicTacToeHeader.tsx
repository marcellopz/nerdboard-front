import { Box, Button, Typography } from "@mui/material";

function TicTacToeHeader({ openDialog }: { openDialog: () => void }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "32px",
        gap: "16px",
        maxWidth: "1280px",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
            data-testid="home-title"
          >
            <Typography variant="h1" sx={{ fontWeight: 600, fontSize: "48px" }}>
              Jogo da velha
            </Typography>
            <Typography variant="h2">
              Jogue jogo da velha com os amigos
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              fontSize: "20px",
            }}
            variant="contained"
            onClick={openDialog}
          >
            Criar partida
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TicTacToeHeader;
