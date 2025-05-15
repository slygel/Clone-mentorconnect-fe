import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthProvider.tsx";
import Registration from "../pages/Registration.tsx";
import Login from "../pages/Login.tsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/" element={<div>Home</div>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;