import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text } from '@chakra-ui/react';
import { Comment } from './Comment';
import apiClient from '../services/api-client';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Author {
  id: number;
  name: string;
  email: string;
}

export const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [author, setAuthor] = useState<Author>();
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/posts/' + id)
      .then((res) => {
        setPost(res.data);
        apiClient
          .get('/users/' + res.data.userId)
          .then((res) => {
            setAuthor(res.data);
          })
          .catch((err) => setError(err.message));
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      {error && <Text>{error}</Text>}
      <Box
        maxW='800px'
        mx='auto'
        p='4'
        mt='8'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
      >
        <Heading as='h1' mb='4'>
          {post && post.title}
        </Heading>
        <Text fontSize='sm' fontWeight='bold'>
          {author && author.name}
        </Text>
        <Text fontSize='sm' color='gray.500' mb='4'>
          {author && author.email}
        </Text>
        <Text fontSize='lg' mb='4'>
          {post && post.body}
        </Text>
      </Box>
      <Comment />
    </>
  );
};
