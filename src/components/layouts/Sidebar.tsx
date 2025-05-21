import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Tag,
    FileText,
    CheckSquare,
    BookOpen,
    MessageSquare,
    Settings,
    LogOut, Calendar
} from 'lucide-react';
import {useAuth} from "../../contexts/AuthProvider.tsx";
import {getCurrentUser} from "../../services/UserService.ts";

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

// Define the type for a link
interface NavLinkItem {
    to: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>; // Type for Lucide icons
    badge?: number; // Optional badge property
}

const Sidebar: React.FC<SidebarProps> = ({sidebarOpen}) => {
    const {user, logout, authAxios} = useAuth();
    const [avatarUrl, setAvatarUrl] = useState<string>("https://via.placeholder.com/150");

    const adminLinks = [
        {to: "/", label: "Dashboard", icon: LayoutDashboard},
        {to: "/users", label: "Users", icon: Users},
        {to: "/categories", label: "Manage Categories", icon: Tag},
        {to: "/courses", label: "Manage Courses", icon: FileText},
        {to: "/mentor-approvals", label: "Mentor Approvals", icon: CheckSquare},
        {to: "/resources", label: "Resources", icon: BookOpen},
        {to: "/messages", label: "Messages", icon: MessageSquare, badge: 4},
    ];

    const mentorLinks = [
        {to: "/", label: "Dashboard", icon: LayoutDashboard},
        {to: "/messages", label: "Messages", icon: MessageSquare, badge: 4},
        {to: "/resources", label: "Resources", icon: BookOpen},
        {to: "/availability", label: "Availability", icon: Calendar},
        {to: "/manage-courses", label: "Manage Courses", icon: FileText},
    ];

    const learnerLinks: NavLinkItem[] = [
        { to: "/", label: "Dashboard", icon: LayoutDashboard },
        { to: "/courses", label: "Browse Courses", icon: FileText },
        { to: "/my-sessions", label: "My Sessions", icon: Calendar },
        { to: "/resources", label: "Resources", icon: BookOpen },
        { to: "/messages", label: "Messages", icon: MessageSquare, badge: 2 },
    ];

    // Select links based on role
    const links: NavLinkItem[] =
        user?.role === "Admin"
            ? adminLinks : user?.role === "Mentor"
            ? mentorLinks : user?.role === "Learner"
            ? learnerLinks : [];

    // Load user avatar
    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const data = await getCurrentUser(authAxios);
                const avatar = data.userDetailsToReturnDTO?.avatar;
                if (avatar) {
                    setAvatarUrl(`data:image/jpeg;base64,${avatar}`);
                }
            } catch (error) {
                console.error("Failed to fetch user avatar:", error);
            }
        };

        fetchAvatar();
    }, [authAxios]);

    return (
        <div
            className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transform fixed md:relative z-30 inset-y-0 left-0 w-64 transition duration-300 ease-in-out bg-[#ECFAE5] overflow-y-auto`}>
            <div className="flex items-center justify-center h-16 bg-[#ECFAE5] border-b border-[#F1F0E9]">
                <h1 className="text-xl font-bold">MentorConnect</h1>
            </div>

            <div className="px-4 py-4">
                {(user?.role === "Mentor" || user?.role === "Learner") ? (
                    <NavLink to="/edit-profile" className="flex items-center">
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="h-12 w-12 rounded-full object-cover border-2 border-[#F1F0E9] cursor-pointer"
                        />
                        <div className="ml-3">
                            <div className="font-medium">{user?.email}</div>
                            <div className="text-gray-600 text-sm">{user?.role}</div>
                        </div>
                    </NavLink>
                ) : (
                    <div className="flex items-center">
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="h-12 w-12 rounded-full object-cover border-2 border-[#F1F0E9]"
                        />
                        <div className="ml-3">
                            <div className="font-medium">{user?.email}</div>
                            <div className="text-gray-600 text-sm">{user?.role}</div>
                        </div>
                    </div>
                )}
            </div>

            <nav className="mt-5 px-2">
                {links.map((link) => (
                    <NavLink
                        key={link.to}
                        to={link.to}
                        className={({isActive}) =>
                            `flex items-center px-4 py-3 mt-2 rounded-lg ${
                                isActive ? "bg-[#8AB2A6]" : "text-gray-800 hover:bg-[#8AB2A6]"
                            }`
                        }
                    >
                        <div className="relative">
                            <link.icon className="h-5 w-5 mr-3"/>
                            {link.badge && (
                                <span
                                    className="absolute -top-1 -right-0 bg-[#8AB2A6] text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                  {link.badge}
                                </span>
                            )}
                        </div>
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            <div className="absolute bottom-0 w-full border-t border-[#2d3a4f] p-4">
                <div className="flex items-center justify-between">
                    <button className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800">
                        <Settings className="h-5 w-5 mr-2"/>
                        Settings
                    </button>
                    <button
                        onClick={() => logout()}
                        className="flex items-center cursor-pointer text-gray-600 hover:text-gray-800"
                    >
                        <LogOut className="h-5 w-5 mr-2"/>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;