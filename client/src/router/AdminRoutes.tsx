import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PageTitle from '../components/PageTitle';
import DefaultLayout from '../layout/DefaultLayout';

import User from '../pages/User';

const AdminRoutes = () => {
    return  (

        <Routes>
             <Route element={<ProtectedRoute />} >
                <Route path="/admin" element={ <DefaultLayout /> } >

                    <Route
                        path="user"
                        element={
                            <>
                                <PageTitle title="Dashboard | User" />
                                <User />
                            </>
                        }
                    />

                </Route>
             </Route>
        
        </Routes>
   
    )
}



export default AdminRoutes;
  