import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import ChatRoomsTable from "./ChatRoomsTable";
import CreateRoomDialog from "./CreateRoomDialog";
import { useNavigate } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import NerdboardBox from "../../components/NerdboardBox";
import useRoomHubStore from "../../store/useRoomHubStore";

function ChatHub() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const { authUser, setOpenSignIn, authLoading } = useAuth();
  const { setChatrooms, setLoading, resetActiveRoom } = useChatStore();
  const { invokeRoomHubMethod, addRoomHubHandler, connectionIsReady } =
    useRoomHubStore();
  const navigate = useNavigate();

  function getRooms() {
    invokeRoomHubMethod("GetRooms")?.then((rooms) => {
      setLoading(false);
      setChatrooms(rooms);
    });
  }

  useEffect(() => {
    resetActiveRoom();
  }, []);

  useEffect(() => {
    if (!connectionIsReady) return;
    if (authLoading) return;
    if (!authUser) {
      setOpenSignIn(true);
      return;
    }

    addRoomHubHandler("RoomsUpdated", (rooms) => {
      setChatrooms(rooms);
    });
    getRooms();
  }, [authUser, authLoading, connectionIsReady]);

  async function onCreateRoom(roomName: string) {
    invokeRoomHubMethod("CreateRoom", roomName, {
      id: authUser?.uid,
      username: authUser?.displayName,
    })?.then((roomId) => {
      navigate(`/chat/${roomId}`);
    });
  }

  return (
    <>
      <NerdboardBox>
        <Box className="flex justify-between items-center m-4">
          <Typography variant="h5" gutterBottom id="tableTitle">
            Chat Rooms
          </Typography>
          <Button
            variant="contained"
            onClick={() => setCreateDialogOpen(true)}
            disabled={!authUser}
            data-testid="create-room-button"
          >
            Create
          </Button>
        </Box>
        <ChatRoomsTable />
      </NerdboardBox>
      <CreateRoomDialog
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={onCreateRoom}
      />
    </>
  );
}

export default ChatHub;
