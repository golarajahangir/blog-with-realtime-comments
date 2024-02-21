import { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  Center,
} from '@chakra-ui/react';
import apiClient from '../services/api-client';
import { Link } from 'react-router-dom';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    apiClient
      .get<Post[]>('/posts')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => setError(err.message));
  }, []);
  return (
    <>
      {error && <Text>{error}</Text>}
      <Center>
        <SimpleGrid
          columns={{ sm: 2, md: 3, lg: 4 }}
          spacingX='20px'
          spacingY='20px'
        >
          {posts &&
            posts.map((post) => (
              <Card
                _hover={{
                  transform: 'scale(1.03)',
                  transition: 'transform .15s ease-in',
                }}
                key={post.id}
                maxW='sm'
              >
                <Link to={`post/${post.id}`}>
                  <CardBody>
                    <Stack mt='6' spacing='3'>
                      <Heading size='md'>{post.title}</Heading>
                      <Text>{post.body}</Text>
                    </Stack>
                  </CardBody>
                </Link>
              </Card>
            ))}
        </SimpleGrid>
      </Center>
    </>
  );
};
