import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../contexts/AuthProvider.tsx";

interface ProtectedRouteProps {
    allowedRoles: string[]; // Roles allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a loading spinner
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />; // Redirect to an unauthorized page
    }

    return <Outlet />;
};

export default ProtectedRoute;