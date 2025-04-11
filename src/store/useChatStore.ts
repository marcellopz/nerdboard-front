import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ChatUser = {
  id: string;
  username: string;
};

export interface ChatRoom {
  id: string;
  name: string;
  createdBy: string;
  users: {
    [key: string]: ChatUser;
  };
}

export interface Message {
  message: string;
  createdAt: string;
  sender: string;
}

export interface ChatState {
  chatRooms: ChatRoom[];
  loading: boolean;
  error: any;
  activeRoomId?: string;
  activeRoom?: ChatRoom;
  activeRoomUsers: ChatUser[];
  activeRoomMessages: Message[];
  setLoading: (loading: boolean) => void;
  setChatrooms: (chatRooms: ChatRoom[]) => void;
  setActiveRoomId: (roomId?: string) => void;
  setActiveRoom: (activeRoom?: ChatRoom) => void;
  setActiveRoomUsers: (activeRoomUsers: ChatUser[]) => void;
  setActiveRoomMessages: (activeRoomMessages: Message[]) => void;
  addMessage: (message: Message) => void;
  resetActiveRoom: () => void;
}

const useChatStore = create<ChatState>()(
  devtools(
    // persist(
    (set, get) => ({
      chatRooms: [],
      loading: true,
      error: null,
      activeRoom: undefined,
      activeRoomId: undefined,
      activeRoomUsers: [],
      activeRoomMessages: [],
      setLoading: (loading) => set({ loading }),
      setChatrooms: (chatRooms) => {
        const { activeRoomId } = get();
        set({
          chatRooms,
          activeRoomUsers: activeRoomId
            ? Object.values(chatRooms.find((c) => c.id === activeRoomId).users)
            : [],
        });
      },
      setActiveRoomId: (roomId) => {
        set({ activeRoomId: roomId });
      },
      setActiveRoom: (activeRoom) => {
        set({ activeRoom });
      },
      setActiveRoomUsers: (activeRoomUsers) => {
        set({ activeRoomUsers });
      },
      setActiveRoomMessages: (activeRoomMessages) => {
        set({ activeRoomMessages });
      },
      addMessage: (message) => {
        set((state) => ({
          activeRoomMessages: [...state.activeRoomMessages!, message],
        }));
      },
      resetActiveRoom: () => {
        set({
          activeRoom: undefined,
          activeRoomId: undefined,
          activeRoomUsers: [],
          activeRoomMessages: [],
        });
      },
    }),
    { name: "chat-storage" }
    // )
  )
);

export default useChatStore;
