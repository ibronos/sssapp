import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AdminRoutes from './router/AdminRoutes';
import FrontendRoutes from './router/FrontendRoutes';
// import axios from "axios";

import Loader from './common/Loader';

function App() {

  // AXIOS GLOBAL SETTINGS
  // axios.defaults.withCredentials = true;

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
