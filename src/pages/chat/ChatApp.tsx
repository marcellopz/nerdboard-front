import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useParams } from "react-router-dom";
import useRoomHubStore from "../../store/useRoomHubStore";
import ChatHub from "./ChatHub";
import ChatRoom from "./room/ChatRoom";

function ChatApp() {
  const { idToken } = useAuth();
  const { roomId } = useParams();
  const { connectToRoomHub, disconnectFromRoomHub } = useRoomHubStore();
  const [connectionError, setConnectionError] = useState<string | null>(null);

  useEffect(() => {
    const initConnection = async () => {
      try {
        if (idToken) {
          await connectToRoomHub(idToken);
        }
      } catch (err) {
        setConnectionError(
          err instanceof Error ? err.message : "Connection failed"
        );
        console.error("Connection error:", err);
      }
    };

    initConnection();

    return () => {
      disconnectFromRoomHub();
    };
  }, [idToken, connectToRoomHub, disconnectFromRoomHub]);

  if (connectionError) {
    return (
      <div className="error-message">Connection error: {connectionError}</div>
    );
  }

  if (roomId) {
    return <ChatRoom />;
  }

  return <ChatHub />;
}

export default ChatApp;
