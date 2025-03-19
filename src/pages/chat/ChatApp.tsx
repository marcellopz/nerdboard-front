import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import useRoomHubStore from "../../store/useRoomHubStore";
import ChatHub from "./ChatHub";
import ChatRoom from "./room/ChatRoom";

function ChatApp() {
  const { idToken } = useAuth();
  const { roomId } = useParams();
  const { connectToRoomHub, disconnectFromRoomHub } = useRoomHubStore();

  useEffect(() => {
    if (idToken) {
      connectToRoomHub(idToken);
      return () => disconnectFromRoomHub();
    } else {
      disconnectFromRoomHub();
    }
  }, [connectToRoomHub, idToken]);

  if (roomId) {
    return <ChatRoom />;
  }

  return <ChatHub />;
}

export default ChatApp;
