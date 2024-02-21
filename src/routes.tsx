import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import { PostDetails } from './components/PostDetails';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/post/:id', element: <PostDetails /> },
]);

export default router;
