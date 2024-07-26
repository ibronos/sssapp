import { Route, Routes, Navigate, useLocation } from 'react-router-dom';

import PageTitle from '../components/PageTitle';
import FrontendLayout from '../layout/FrontendLayout';

import SignIn from '../pages/Authentication/SignIn';
import SignUp from '../pages/Authentication/SignUp';
import RegisterAdmin from '../pages/Authentication/RegisterAdmin';

const FrontendRoutes = () => {
    return  (
        <FrontendLayout>
            <Routes>
                <Route
                    index
                    element={
                    <>
                        <Navigate to='/signin' replace />
                    </>
                    }
                />
                <Route
                    path="signin"
                    element={
                        <>
                        <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <SignIn />
                        </>
                    }
                    />
                <Route
                    path="/signup"
                    element={
                    <>
                        <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                        <SignUp />
                    </>
                    }
                />
                 <Route
                    path="/register-admin"
                    element={
                    <>
                        <PageTitle title="Signup - Admin" />
                        <RegisterAdmin />
                    </>
                    }
                />
            </Routes>
        </FrontendLayout>
    )
}



export default FrontendRoutes;
  