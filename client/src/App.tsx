import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminRoutes from './router/AdminRoutes';
import FrontendRoutes from './router/FrontendRoutes';

import Loader from './common/Loader';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <AdminRoutes />
      <FrontendRoutes />
    </>
    
  );
}

export default App;
