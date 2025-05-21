import React from 'react';
import MentorDashboard from "./mentor/MentorDashboard.tsx";
import {useAuth} from "../contexts/AuthProvider.tsx";
import AdminDashboard from "./admin/AdminDashboard.tsx";

const Dashboard: React.FC = () => {
    const { user } = useAuth();

    if (user?.role === "Admin") {
        return <AdminDashboard/>;
    }else if (user?.role === "Mentor") {
        return <MentorDashboard />;
    }
};

export default Dashboard;