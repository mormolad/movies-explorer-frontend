import React from 'react';
import { Navigate } from 'react-router-dom';
import Preloader from '../Preloader/Preloader.jsx';
// этот компонент принимает другой компонент в качестве пропса
// он также может взять неограниченное число пропсов и передать их новому компоненту
const ProtectedRoute = ({ element: Component, ...props }) => {
  return props.isChekToken ? (
    props.isLoggedIn ? (
      <Component {...props} />
    ) : (
      <Navigate to="/" replace />
    )
  ) : (
    <Preloader />
  );
};

export default ProtectedRoute;
