import { Box, Button, Typography } from "@mui/material";
import TicTacToeHeader from "./TicTacToeHeader";
import { useState } from "react";
import CreateRoomDialog from "./dialog/CreateRoomDialog";

function TicTacToeHub() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  async function onCreate(name: string) {
    console.log(name);
    return Promise.resolve();
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TicTacToeHeader openDialog={() => setCreateDialogOpen(true)} />
      </Box>
      <CreateRoomDialog
        onClose={() => setCreateDialogOpen(false)}
        onCreate={onCreate}
        open={createDialogOpen}
      />
    </>
  );
}

export default TicTacToeHub;
