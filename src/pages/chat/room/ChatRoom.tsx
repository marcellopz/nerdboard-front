import { Box, Divider, Paper } from "@mui/material";
import { Navigate, useParams } from "react-router-dom";
import ChatMemberList from "./ChatMemberList";
import ChatMessages from "./ChatMessages";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/authContext";
import useChatStore from "../../../store/useChatStore";
import useRoomHubStore from "../../../store/useRoomHubStore";

export type ChatMessage = {
  message: string;
  createdAt: string;
  user: ChatUser;
};

export type ChatUser = {
  userId: string;
  username: string;
};

function ChatRoom() {
  const { roomId } = useParams();
  const { invokeRoomHubMethod, connectionIsReady, addRoomHubHandler } =
    useRoomHubStore();
  const { authUser, authLoading } = useContext(AuthContext);
  const { setActiveRoomId, activeRoomId, activeRoomUsers, setActiveRoomUsers } =
    useChatStore();

  function getUsers() {
    invokeRoomHubMethod("GetUsersInRoom", activeRoomId)?.then((users) => {
      setActiveRoomUsers(users);
    });
  }

  useEffect(() => {
    if (roomId) setActiveRoomId(roomId);
  }, [roomId]);

  useEffect(() => {
    if (!connectionIsReady || !authUser || !activeRoomId) return;
    invokeRoomHubMethod("JoinRoom", activeRoomId);

    addRoomHubHandler("UserAdded", (user) => {
      console.log("User added:", user);
      getUsers();
    });
    addRoomHubHandler("UserRemoved", (user) => {
      console.log("User removed:", user);
      getUsers();
    });
    getUsers();

    return () => {
      console.log("Leaving room", activeRoomId);
      invokeRoomHubMethod("LeaveRoom", activeRoomId);
    };
  }, [activeRoomId, authUser, connectionIsReady]);

  if (!authUser && !authLoading) return <Navigate to="/" />;

  return (
    <div className="p-4 pt-8 md:p-8 z-1 flex justify-center">
      <Paper
        className="flex flex-col md:flex-row"
        sx={{
          maxWidth: "1000px",
          width: "100%",
          minHeight: "600px",
          overflow: "hidden",
        }}
      >
        <Box className="w-full md:w-1/4">
          <ChatMemberList users={activeRoomUsers} />
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          sx={{
            height: "calc(100% - 16px)",
            marginTop: "16px",
            display: { xs: "none", md: "block" },
          }}
        />
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          <ChatMessages
            messages={[]}
            sendMessage={(message) => {
              // Send message to the chat room
              console.log(message);
            }}
          />
        </Box>
      </Paper>
    </div>
  );
}

export default ChatRoom;
