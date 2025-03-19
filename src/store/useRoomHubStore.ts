import { create } from "zustand";
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";

interface RoomHubStore {
  connection: HubConnection | null;
  connectionIsReady: boolean;
  connectToRoomHub: (token: string) => void;
  disconnectFromRoomHub: () => void;
  invokeRoomHubMethod: (
    methodName: string,
    ...args: any[]
  ) => Promise<any> | void;
  addRoomHubHandler: (
    methodName: string,
    callback: (...args: any[]) => void
  ) => void;
  removeRoomHubHandler: (
    methodName: string,
    callback: (...args: any[]) => void
  ) => void;
}

const useRoomHubStore = create<RoomHubStore>((set, get) => ({
  connection: null,
  connectionIsReady: false,

  connectToRoomHub: (token: string) => {
    if (!get().connection) {
      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_API_BASE_URL + "/roomHub", {
          accessTokenFactory: () => token,
        })
        .withAutomaticReconnect()
        .build();

      connection
        .start()
        .then(() => {
          set({ connectionIsReady: connection.state === "Connected" });
          console.log("RoomHub connection established!");
        })
        .catch((err) => {
          console.error("RoomHub connection failed: ", err);
          set({ connectionIsReady: false });
        });

      set({ connection });
    }
  },

  disconnectFromRoomHub: () => {
    const { connection } = get();
    if (connection) {
      connection
        .stop()
        .then(() => {
          set({ connection: null, connectionIsReady: false });
          console.log("RoomHub connection stopped!");
        })
        .catch((err) =>
          console.error("Error stopping RoomHub connection: ", err)
        );
    }
  },

  invokeRoomHubMethod: (methodName: string, ...args: any[]) => {
    const { connection } = get();
    if (connection) {
      return connection
        .invoke(methodName, ...args)
        .catch((err) =>
          console.error(`Error invoking ${methodName} on RoomHub: `, err)
        );
    }
  },

  addRoomHubHandler: (
    methodName: string,
    callback: (...args: any[]) => void
  ) => {
    const { connection } = get();
    if (connection) {
      connection.on(methodName, callback);
    }
  },

  removeRoomHubHandler: (
    methodName: string,
    callback: (...args: any[]) => void
  ) => {
    const { connection } = get();
    if (connection) {
      connection.off(methodName, callback);
    }
  },
}));

export default useRoomHubStore;
