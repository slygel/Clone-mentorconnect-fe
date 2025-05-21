import Sidebar from "../components/layouts/Sidebar.tsx";
import {useState} from "react";

interface LayoutProps {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4">
                    <main>{children}</main>
                </main>
            </div>
        </div>
    )
}