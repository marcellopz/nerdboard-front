import {
  Avatar,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { ChatUser } from "../../../store/useChatStore";

interface ChatMemberListProps {
  users: ChatUser[];
  roomLoading: boolean;
}

const ChatMemberList: FunctionComponent<ChatMemberListProps> = ({
  users,
  roomLoading,
}) => {
  return (
    <Box
      sx={{
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <Typography
        variant={"h6"}
        color={"primary"}
        sx={{
          fontSize: "1rem",
        }}
      >
        {roomLoading ? "Carregando..." : `${users ? users.length : 0} Online`}
      </Typography>
      <Divider />
      <Box
        sx={{
          marginTop: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {roomLoading && (
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
          >
            <CircularProgress size="30px" />
          </div>
        )}
        {users &&
          Object.entries(users).map(([id, user]) => (
            <Box
              key={user.username}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }} alt={user.username} />
              <Typography
                color={"primary"}
                sx={{
                  fontSize: "1rem",
                }}
                data-testid={`user-${user.username}`}
              >
                {user.username}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default ChatMemberList;
