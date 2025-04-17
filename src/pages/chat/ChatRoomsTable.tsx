import {
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import { useAuth } from "../../contexts/authContext";

function ChatRoomsTable() {
  const { unauthenticated } = useAuth();
  const { chatRooms, loading } = useChatStore();
  const navigate = useNavigate();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "rgba(0,0,0,0.08)" }}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nome da sala</TableCell>
            <TableCell>Membros</TableCell>
            <TableCell>Criado por</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {unauthenticated && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                data-testid="unauthenticated-message"
              >
                Você precisa estar logado para acessar as salas de chat.
              </TableCell>
            </TableRow>
          )}
          {!unauthenticated && loading && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <CircularProgress />
              </TableCell>
            </TableRow>
          )}
          {chatRooms.length === 0 && !loading && (
            <TableRow>
              <TableCell
                colSpan={4}
                align="center"
                data-testid="no-rooms-message"
              >
                Nenhuma sala de chat encontrada.
              </TableCell>
            </TableRow>
          )}
          {chatRooms.map((row) => (
            <TableRow
              data-testid={`room-${row.name}`}
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.03)",
                },
              }}
              onClick={() => {
                navigate("/chat/" + row.id);
              }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell component="th" scope="row">
                {Object.keys(row.users).length}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.createdBy}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ChatRoomsTable;
