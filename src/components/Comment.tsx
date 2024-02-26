import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';
import io from 'socket.io-client';

interface Comment {
  id: number;
  content: string;
}

const socket = io('http://localhost:3001');

export const Comment = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const sendcomment = () => {
    socket.emit('send_comment', { comment });
  };

  useEffect(() => {
    socket.on('receive_comment', (data: { comment: string }) => {
      setComments((prevComments) => [
        ...prevComments,
        { id: prevComments.length + 1, content: data.comment },
      ]);
    });

    // Clean up socket listener on unmount
    return () => {
      socket.off('receive_comment');
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
        <Box>
          {comments.map((msg) => (
            <Box p={4} shadow='md' borderWidth='1px' rounded='md' mb='4'>
              <Stack direction='row' align='center' mb={3}>
                <Avatar icon={<AiOutlineUser />} size='sm' />
              </Stack>
              <Text>{msg.content}</Text>
            </Box>
          ))}
        </Box>
        <Heading as='h6' size='lg' mb='4'>
          Write your comment
        </Heading>
        <Input
          mb='4'
          placeholder='Comment...'
          value={comment}
          onChange={(event) => {
            setComment(event.target.value);
          }}
        />
        <Button onClick={sendcomment} mb='4'>
          Send
        </Button>
      </Box>
    </>
  );
};

export default Comment;
