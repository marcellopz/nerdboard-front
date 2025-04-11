import { create } from "zustand";
import {
  HttpTransportType,
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";

interface RoomHubStore {
  connection: HubConnection | null;
  connectionIsReady: boolean;
  connectToRoomHub: (token: string) => void;
  disconnectFromRoomHub: () => void;
  invokeRoomHubMethod: (methodName: string, ...args: any[]) => Promise<any>;
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

  connectToRoomHub: async (token: string) => {
    try {
      // Disconnect existing connection if any
      await get().disconnectFromRoomHub();

      const connection = new HubConnectionBuilder()
        .withUrl(import.meta.env.VITE_API_BASE_URL + "/roomHub", {
          accessTokenFactory: () => token,
          skipNegotiation: true, // Important for WebSocket connections
          transport: HttpTransportType.WebSockets,
        })
        .withAutomaticReconnect({
          nextRetryDelayInMilliseconds: (retryContext) => {
            // Exponential backoff
            return Math.min(retryContext.elapsedMilliseconds * 2, 10000);
          },
        })
        .configureLogging(LogLevel.Information)
        .build();

      // Set connection immediately
      set({ connection });

      // Start connection
      await connection.start();
      set({ connectionIsReady: true });
      console.info("RoomHub connection established!");

      // Handle reconnection events
      connection.onclose((error) => {
        console.error("Connection closed:", error);
      });

      connection.onreconnecting((error) => {
        console.info("Reconnecting due to:", error);
      });

      connection.onreconnected((connectionId) => {
        console.info("Reconnected with ID:", connectionId);
      });
    } catch (err) {
      console.error("RoomHub connection failed: ", err);
      set({ connection: null, connectionIsReady: false });
      throw err; // Re-throw to handle in component
    }
  },

  disconnectFromRoomHub: async () => {
    const { connection } = get();
    if (connection) {
      try {
        await connection.stop();
        set({ connection: null, connectionIsReady: false });
        console.info("RoomHub connection stopped!");
      } catch (err) {
        console.error("Error stopping RoomHub connection: ", err);
      }
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
