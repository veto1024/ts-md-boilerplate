import { Navigate, useRoutes } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <p>Hello</p>,
    },
    {
      path: '404',
      element: <p>Error </p>,
    },
    {
      path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
