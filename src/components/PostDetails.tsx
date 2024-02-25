import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Notification } from './Notification';
import { FaThumbsUp } from 'react-icons/fa';
import apiClient from '../services/api-client';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post>();
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get('/posts/' + id)
      .then((res) => {
        setPost(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      {error && <Text>{error}</Text>}
      <Heading maxW='800px' mx='auto' mt='8' p='4'>
        Post Details
      </Heading>
      <Box
        maxW='800px'
        mx='auto'
        p='4'
        borderWidth='1px'
        borderRadius='lg'
        boxShadow='lg'
      >
        <Heading as='h1' mb='4'>
          {post && post.title}
        </Heading>
        <Flex align='center' justify='space-between' mb='4'>
          <VStack align='flex-start'>
            <Text fontSize='sm' fontWeight='bold'>
              {/* By {post && post.author} */}
              asdfd
            </Text>
            <Text fontSize='sm' color='gray.500'>
              {/* {post && post.date} */} date
            </Text>
          </VStack>
          <HStack spacing='2'>
            <IconButton
              aria-label='Like'
              icon={<FaThumbsUp />}
              variant='ghost'
              colorScheme='blue'
            />
            <Text fontSize='sm' color='gray.500'>
              {/* {post && post.likes} likes */}
              likes
            </Text>
          </HStack>
        </Flex>
        <Text fontSize='lg' mb='4'>
          {post && post.body}
        </Text>
        <Divider mb='4' />
        <Heading as='h2' size='md' mb='4'>
          {/* Comments ({post && post.comments.length}) */}
          22
        </Heading>

        <Box key={2} borderWidth='1px' borderRadius='md' p='2' mb='2'>
          <Text fontSize='sm' fontWeight='bold'>
            asdfadf
          </Text>
          <Text fontSize='sm'>asdfadsf</Text>
        </Box>
      </Box>
      <Notification />
    </>
  );
};
