'use client'; // Next.js 13+ App Router, client component

import { useEffect, useState, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  from: string;
  message: string;
}

export default function MessagingPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [recipientId, setRecipientId] = useState('456'); // example recipient
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Connect to WS server
    const socket = io('http://localhost:3333', {
      query: { userId: '123' }, // current user
    });

    socket.on('connect', () => console.log('Connected to WS server'));

    socket.on('receive_message', (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    socketRef.current = socket;

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && input.trim() !== '') {
      socketRef.current.emit('send_message', {
        recipientId,
        message: input,
      });
      setMessages((prev) => [...prev, { from: 'Me', message: input }]);
      setInput('');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Messaging</h1>

      <div className="mb-2">
        <label className="block mb-1">Recipient ID:</label>
        <input
          type="text"
          value={recipientId}
          onChange={(e) => setRecipientId(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <div className="border p-2 h-64 overflow-y-auto mb-2">
        {messages.map((msg, idx) => (
          <div key={idx}>
            <strong>{msg.from}: </strong>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
