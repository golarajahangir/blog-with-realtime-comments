import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
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
  });
  return (
    <>
      {error && <Text>{error}</Text>}
      <Text>{post && post.body}</Text>
    </>
  );
};
