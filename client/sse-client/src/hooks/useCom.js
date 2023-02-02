import { useContext } from 'react';
import { WebsocketContext } from '../contexts/websocketContext';

export default function useCom() {
  const socket = useContext(WebsocketContext);

  socket.on('newNotifications', (res) => {
    console.log(res);
  });
  
  const sendNotification = () => {
    socket.emit('findAllNotifications', {}, (res) => {
      console.log(res);
    });
  };

  const clientToServer = (payload) => {
    socket.emit('send', payload, (res) => {
      console.log(res);
    });
  };

  const assign = (userId) => {
    socket.emit('assign', userId);
  };

  const receive = () => {
    socket.on('newNotifications', (res) => {
      console.log(res);
    });
  };

  return { sendNotification, clientToServer, assign, receive };
}
