import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../contexts/AuthProvider.tsx";
import Registration from "../pages/Registration.tsx";
import Login from "../pages/Login.tsx";
import Users from "../pages/admin/Users.tsx";
import Categories from "../pages/admin/Categories.tsx";
import Courses from "../pages/admin/Courses.tsx";
import MentorApprovals from "../pages/mentor/MentorApprovals.tsx";
import Availability from "../pages/mentor/Availability.tsx";
import ProtectedRoute from "./ProtectedRouteProps.tsx";
import Dashboard from "../pages/Dashboard.tsx";
import Messages from "../pages/Messages.tsx";
import Resources from "../pages/admin/Resources.tsx";
import ManageCourses from "../pages/mentor/ManageCourses.tsx";
import EditProfile from "../pages/EditProfile.tsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route element={<ProtectedRoute allowedRoles={["Admin", "Mentor"]} />}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/resources" element={<Resources />} />
                    </Route>

                    {/* Mentor-Only Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["Mentor"]} />}>
                        <Route path="/availability" element={<Availability/>}/>
                        <Route path="/manage-courses" element={<ManageCourses/>}/>
                    </Route>

                    {/* Admin-Only Routes */}
                    <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
                        <Route path="/users" element={<Users />} />
                        <Route path="/categories" element={<Categories />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/mentor-approvals" element={<MentorApprovals />} />
                    </Route>


                    {/* Public Routes */}
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/edit-profile" element={<EditProfile />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default AppRoutes;