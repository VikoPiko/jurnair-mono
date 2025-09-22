import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

interface MessagePayload {
  recipientId: string;
  message: string;
}

@WebSocketGateway({
  cors: {
    origin: '*', // allow all origins for now
  },
})
export class MessageGateway {
  @WebSocketServer()
  server!: Server;

  // Track connected users: userId -> socket.id
  private users: Record<string, string> = {};

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (userId) {
      this.users[userId] = client.id;
      console.log(`User connected: ${userId}`);
    }
  }

  handleDisconnect(client: Socket) {
    const userId = Object.keys(this.users).find(
      (id) => this.users[id] === client.id
    );
    if (userId) {
      delete this.users[userId];
      console.log(`User disconnected: ${userId}`);
    }
  }

  @SubscribeMessage('send_message')
  handleMessage(
    @MessageBody() data: MessagePayload,
    @ConnectedSocket() client: Socket
  ) {
    const recipientSocketId = this.users[data.recipientId];
    if (recipientSocketId) {
      this.server.to(recipientSocketId).emit('receive_message', {
        from: client.handshake.query.userId,
        message: data.message,
      });
    }
  }
}
