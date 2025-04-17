import { FunctionComponent, useEffect, useRef } from "react";
import { Avatar, Box, TextField, Typography } from "@mui/material";
import { Message } from "../../../store/useChatStore";

interface ChatMessagesProps {
  messages: Message[];
  sendMessage: (message: string) => void;
}

const ChatMessages: FunctionComponent<ChatMessagesProps> = ({
  messages,
  sendMessage,
}) => {
  const messagesBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesBoxRef.current?.scrollTo({
      top: messagesBoxRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          flexGrow: 1,
          height: "550px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
          }}
          ref={messagesBoxRef}
          data-testid="messages-box"
        >
          {messages.map((message) => (
            <Box
              key={message.createdAt}
              sx={{
                display: "flex",
                padding: "8px 10px",
                gap: "10px",
                alignItems: "center",
                ":hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.03)",
                },
              }}
            >
              <Avatar sx={{ width: 32, height: 32 }} alt={message.sender}>
                {message.sender[0]}
              </Avatar>
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Typography fontWeight={700}>{message.sender}</Typography>
                  <Typography fontSize={11}>
                    {new Date(message.createdAt).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Typography>
                </Box>
                <Typography sx={{ textWrap: "wrap" }}>
                  {message.message}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <TextField
        id="message"
        variant="filled"
        placeholder="Mensagem"
        autoComplete="off"
        fullWidth
        sx={{
          "& .MuiInputBase-root": {
            borderRadius: "0px",
            backgroundColor: "#F2F9F6",
          },
        }}
        slotProps={{
          htmlInput: {
            "data-testid": "chat-input",
            sx: {
              padding: "16px",
            },
          },
        }}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            if (target.value === "") return;
            sendMessage(target.value);
            target.value = "";
          }
        }}
      />
    </Box>
  );
};

export default ChatMessages;
