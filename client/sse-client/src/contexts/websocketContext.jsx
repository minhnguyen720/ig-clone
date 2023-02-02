import { io } from 'socket.io-client';
import { createContext } from 'react';

export const WebsocketContext = createContext();

export default function WebsocketContextProvider({ children }) {
  const socket = io('http://localhost:3000');
  return (
    <WebsocketContext.Provider value={socket}>
      {children}
    </WebsocketContext.Provider>
  );
}
