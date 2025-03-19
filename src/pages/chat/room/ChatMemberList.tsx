import { Avatar, Box, Divider, Typography } from "@mui/material";
import { FunctionComponent } from "react";

interface ChatMemberListProps {
  users: string[] | undefined;
  // users?: {
  //   [key: string]: ChatUser;
  // };
}

const ChatMemberList: FunctionComponent<ChatMemberListProps> = ({ users }) => {
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
        {users ? users.length : 0} Online
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
        {users &&
          users.map((user) => (
            <Box
              key={user}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={user}
                src="/static/images/avatar/2.jpg" // implementar avatar
              />
              <Typography
                color={"primary"}
                sx={{
                  fontSize: "1rem",
                }}
              >
                {user}
              </Typography>
            </Box>
          ))}
        {/* Para quando users for um objeto */}
        {/* {users &&
          Object.entries(users).map(([id, user]) => (
            <Box
              key={user.name}
              sx={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt={user.name}
                src="/static/images/avatar/2.jpg" // implementar avatar
              />
              <Typography
                color={"primary"}
                sx={{
                  fontSize: "1rem",
                }}
              >
                {user.name}
              </Typography>
            </Box>
          ))} */}
      </Box>
    </Box>
  );
};

export default ChatMemberList;
