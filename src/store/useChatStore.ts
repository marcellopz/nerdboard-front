import { create } from "zustand";
import { devtools } from "zustand/middleware";

// Define types
export interface ChatRoom {
  roomId: string;
  roomName: string;
  createdBy: string;
  users: {
    [key: string]: {
      id: string;
      username: string;
    };
  };
}

export interface Message {
  id: string;
  message: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ChatState {
  chatRooms: ChatRoom[];
  loading: boolean;
  error: any;
  activeRoomId?: string;
  activeRoom?: ChatRoom;
  activeRoomUsers?: string[];
  setChatrooms: (chatRooms: ChatRoom[]) => void;
  setActiveRoomId: (roomId: string) => void;
  setActiveRoom: (activeRoom: ChatRoom) => void;
  setActiveRoomUsers: (activeRoomUsers: string[]) => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    // persist(
    (set, _get) => ({
      chatRooms: [],
      loading: false,
      error: null,
      activeRoom: undefined,
      setChatrooms: (chatRooms) => set({ chatRooms }),
      setActiveRoomId: (roomId) => {
        set({ activeRoomId: roomId });
      },
      setActiveRoom: (activeRoom) => {
        set({ activeRoom });
      },
      setActiveRoomUsers: (activeRoomUsers) => {
        set({ activeRoomUsers });
      },
    }),
    { name: "chat-storage" }
    // )
  )
);

export default useChatStore;
