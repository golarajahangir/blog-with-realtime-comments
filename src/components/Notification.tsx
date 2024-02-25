import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Input, Text } from '@chakra-ui/react';
import io from 'socket.io-client';

interface Message {
  id: number;
  content: string;
}

const socket = io.connect('http://localhost:3001');

export const Notification: React.FC = () => {
  // Messages States
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = () => {
    socket.emit('send_message', { message });
  };

  useEffect(() => {
    socket.on('receive_message', (data: { message: string }) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, content: data.message },
      ]);
    });

    // Clean up socket listener on unmount
    return () => {
      socket.off('receive_message');
    };
  }, []);

  return (
    <>
      <Box
        maxW='800px'
        mx='auto'
        mt='8'
        p='4'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
      >
        <Heading as='h5' size='lg' mb='4'>
          Write a comment
        </Heading>
        <Input
          mb='4'
          placeholder='Message...'
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Button onClick={sendMessage} mb='4'>
          Send Message
        </Button>
        <Heading as='h6' size='lg'>
          Messages
        </Heading>
        <Box>
          {messages.map((msg) => (
            <Text key={msg.id} mt='8' p='4'>
              {msg.content}
            </Text>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Notification;
