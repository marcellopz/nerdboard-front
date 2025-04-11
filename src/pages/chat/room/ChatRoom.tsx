import { Box, Divider, IconButton, Paper } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import ChatMemberList from "./ChatMemberList";
import ChatMessages from "./ChatMessages";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/authContext";
import useChatStore from "../../../store/useChatStore";
import useRoomHubStore from "../../../store/useRoomHubStore";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";

export type ChatUser = {
  userId: string;
  username: string;
};

function ChatRoom() {
  const { roomId } = useParams();
  const {
    invokeRoomHubMethod,
    connectionIsReady,
    addRoomHubHandler,
    removeRoomHubHandler,
  } = useRoomHubStore();
  const { authUser, authLoading } = useContext(AuthContext);
  const {
    activeRoomId,
    activeRoomUsers,
    activeRoomMessages,
    setActiveRoomId,
    setActiveRoomUsers,
    addMessage,
  } = useChatStore();
  const [roomLoading, setRoomLoading] = useState(true);
  const navigate = useNavigate();

  function getUsers() {
    invokeRoomHubMethod("GetUsersInRoom", activeRoomId)?.then((users) => {
      setActiveRoomUsers(users);
      setRoomLoading(false);
    });
  }

  useEffect(() => {
    if (roomId) setActiveRoomId(roomId);
  }, [roomId]);

  useEffect(() => {
    if (!connectionIsReady || !authUser || !activeRoomId) return;
    invokeRoomHubMethod("JoinRoom", activeRoomId);

    function messageReceivedHandler(sender: string, message: string) {
      addMessage({
        message,
        createdAt: new Date().toISOString(),
        sender: sender,
      });
    }

    addRoomHubHandler("ReceiveMessage", messageReceivedHandler);
    getUsers();

    return () => {
      removeRoomHubHandler("ReceiveMessage", messageReceivedHandler);
      invokeRoomHubMethod("LeaveRoom", activeRoomId);
    };
  }, [activeRoomId, authUser, connectionIsReady]);

  if (!authUser && !authLoading) return <Navigate to="/" />;

  return (
    <div className="p-4 pt-8 md:p-8 md:pt-4 z-1 flex justify-center">
      <Box
        sx={{
          maxWidth: "1000px",
          width: "100%",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <div className="m-2 w-full">
          <IconButton
            data-testid="leave-room-button"
            onClick={() => navigate("/chat")}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <Paper className="flex flex-col md:flex-row">
          <Box className="w-full md:w-1/4">
            <ChatMemberList users={activeRoomUsers} roomLoading={roomLoading} />
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            sx={{
              height: "unset",
              marginTop: "16px",
              marginBottom: 0,
              display: { xs: "none", md: "block" },
            }}
          />
          <Box sx={{ flexGrow: 1, display: "flex" }}>
            <ChatMessages
              messages={activeRoomMessages}
              sendMessage={(message) => {
                invokeRoomHubMethod("SendMessageToRoom", roomId, message);
              }}
            />
          </Box>
        </Paper>
      </Box>
    </div>
  );
}

export default ChatRoom;
