import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import PageTitle from '../components/PageTitle';
import DefaultLayout from '../layout/DefaultLayout';

import User from '../pages/User';
import Verifikator from '../pages/Verifikator';
import Izin from '../pages/Izin';

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

                    <Route
                        path="verifikator"
                        element={
                            <>
                                <PageTitle title="Dashboard | Verifikator" />
                                <Verifikator />
                            </>
                        }
                    />

                    <Route
                        path="izin"
                        element={
                            <>
                                <PageTitle title="Dashboard | Izin" />
                                <Izin />
                            </>
                        }
                    />

                    <Route
                        path="izin-approval"
                        element={
                            <>
                                <PageTitle title="Dashboard | Izin Approval" />
                                {/* <Verifikator /> */}
                            </>
                        }
                    />

                </Route>
             </Route>
        
        </Routes>
   
    )
}



export default AdminRoutes;
  