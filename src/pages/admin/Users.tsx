import React, { useEffect, useState } from "react";
import {
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Search,
  Eye,
} from "lucide-react";
import Layout from "../Layout.tsx";
import SearchInput from "../../components/layouts/SearchInput.tsx";
import { getAllUsers, updateUserStatus } from "../../services/UserService.ts";
import { useAuth } from "../../contexts/AuthProvider.tsx";
import ToggleUserStatus from "../../components/ToggleUserStatus.tsx";
import Modal from "../../components/Modal.tsx";

interface User {
  userID: string;
  name: string;
  email: string;
  role: "Mentor" | "Learner";
  createdAt: string;
  accountStatus: "Active" | "Pending" | "Deactivated";
  lastActiveAt: string;
  userDetailsToReturnDTO: {
    bio: string;
    notiAllowed: any;
    messageAllowed: any;
    isPrivate: any;
    teachingApproach: string;
    preference: string;
    availability: string;
    prefferedStyle: string;
    sessionDur: any;
    sessionFreq: string;
    learningGoal: string;
    prefferedComm: string;
    fullName: string;
    avatar?: string;
  };
}

type SortKey = "role" | "createdAt" | "accountStatus" | "lastActiveAt";

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All Users");
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPages = Math.ceil(totalUsers / pageSize);

  const [sortBy, setSortBy] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const { authAxios } = useAuth();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers(authAxios, {
        name: searchTerm,
        email: searchTerm,
        role: filter === "All Users" ? undefined : filter.slice(0, -1),
        pageIndex: pageIndex + 1,
        pageSize,
        sortBy: sortBy || undefined,
        sortDirection: sortDirection,
      });

      setUsers(response.items || []);
      setTotalUsers(response.totalRecords || response.items?.length || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, filter, pageIndex, pageSize, sortBy, sortDirection]);

  const handleStatusToggle = async (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Deactivated" : "Active";
    try {
      await updateUserStatus(authAxios, userId, newStatus);
      fetchUsers();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
    setPageIndex(0);
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users.filter((user) => {
    if (filter === "Mentors" && user.role !== "Mentor") return false;
    if (filter === "Learners" && user.role !== "Learner") return false;
    return (
      user.userDetailsToReturnDTO.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <SearchInput
              placeholder="Search users..."
              value={searchTerm}
              onSearchChange={(value) => {
                setSearchTerm(value);
                setPageIndex(0);
              }}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex space-x-2">
            {["All Users", "Mentors", "Learners"].map((label) => (
              <button
                key={label}
                className={`cursor-pointer px-4 py-2 rounded-md ${
                  filter === label
                    ? "bg-[#3D8D7A] text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  setFilter(label);
                  setPageIndex(0);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading users...</div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("role")}
                    >
                      Role{" "}
                      {sortBy === "role" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      Join Date{" "}
                      {sortBy === "createdAt" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("accountStatus")}
                    >
                      Status{" "}
                      {sortBy === "accountStatus" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </th>
                    <th
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("lastActiveAt")}
                    >
                      Last Active{" "}
                      {sortBy === "lastActiveAt" &&
                        (sortDirection === "asc" ? (
                          <ChevronUp className="inline h-4 w-4" />
                        ) : (
                          <ChevronDown className="inline h-4 w-4" />
                        ))}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.userID} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {user.userDetailsToReturnDTO.avatar ? (
                            <img
                              src={`data:image/png;base64,${user.userDetailsToReturnDTO.avatar}`}
                              alt={user.userDetailsToReturnDTO.fullName}
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
                              {user.userDetailsToReturnDTO.fullName
                                .charAt(0)
                                .toUpperCase()}
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.userDetailsToReturnDTO.fullName}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "Mentor"
                              ? "bg-blue-100 text-blue-800"
                              : user.role === "Learner"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {user.role}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.createdAt)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.accountStatus === "Active"
                              ? "bg-green-100 text-green-800"
                              : user.accountStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {user.accountStatus}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {formatDate(user.lastActiveAt)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2 items-center">
                          <button
                            className="text-blue-600 hover:text-green-900 cursor-pointer"
                            onClick={() => handleViewUser(user)}
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button className="text-green-600 hover:text-green-900 cursor-pointer">
                            <MessageSquare className="h-5 w-5" />
                          </button>
                          <ToggleUserStatus
                            userId={user.userID}
                            currentStatus={user.accountStatus}
                            onToggle={handleStatusToggle}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>
              Showing {users.length} of {totalUsers} users
            </span>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0); // Reset to first page on size change
              }}
              className="border border-gray-300 rounded px-2 py-1"
            >
              {[5, 10, 15, 20].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <button
              disabled={pageIndex === 0}
              onClick={() => setPageIndex(0)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
              title="First page"
            >
              &laquo;
            </button>

            <button
              disabled={pageIndex === 0}
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
            >
              Prev
            </button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // For simplicity, show 5 page buttons at most
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (pageIndex < 3) {
                  pageNum = i + 1;
                } else if (pageIndex > totalPages - 3) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = pageIndex - 1 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setPageIndex(pageNum - 1)}
                    className={`w-8 h-8 flex items-center justify-center rounded cursor-pointer hover:bg-gray-300 ${
                      pageIndex === pageNum - 1
                        ? "bg-[#3D8D7A] text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              disabled={pageIndex + 1 >= totalPages}
              onClick={() =>
                setPageIndex((prev) =>
                  prev + 1 < totalPages ? prev + 1 : prev
                )
              }
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
            >
              Next
            </button>

            <button
              disabled={pageIndex + 1 >= totalPages}
              onClick={() => setPageIndex(totalPages - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 cursor-pointer hover:bg-gray-300"
              title="Last page"
            >
              &raquo;
            </button>
          </div>
        </div>

        {selectedUser && (
          <Modal onClose={closeModal}>
            <div className="p-6 space-y-6">
              {/* Avatar */}
              {selectedUser.userDetailsToReturnDTO.avatar && (
                <div className="flex justify-center">
                  <img
                    src={`data:image/png;base64,${selectedUser.userDetailsToReturnDTO.avatar}`}
                    alt={selectedUser.userDetailsToReturnDTO.fullName}
                    className="h-24 w-24 rounded-full object-cover shadow-md"
                  />
                </div>
              )}

              {/* Heading */}
              <h2 className="text-2xl font-bold text-center border-b border-gray-300 pb-2">
                User Details
              </h2>

              {/* 2-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-800">
                <p>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.fullName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedUser.email}
                </p>
                <p>
                  <span className="font-semibold">Role:</span>{" "}
                  {selectedUser.role}
                </p>
                <p>
                  <span className="font-semibold">Account Status:</span>{" "}
                  {selectedUser.accountStatus}
                </p>
                <p>
                  <span className="font-semibold">Join Date:</span>{" "}
                  {formatDate(selectedUser.createdAt)}
                </p>
                <p>
                  <span className="font-semibold">Last Active:</span>{" "}
                  {formatDate(selectedUser.lastActiveAt)}
                </p>
                <p>
                  <span className="font-semibold">Bio:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.bio || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">
                    Preferred Communication:
                  </span>{" "}
                  {selectedUser.userDetailsToReturnDTO.prefferedComm || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Learning Goal:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.learningGoal || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Session Frequency:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.sessionFreq || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Session Duration:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.sessionDur
                    ? `${selectedUser.userDetailsToReturnDTO.sessionDur} hour(s)`
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Preferred Style:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.prefferedStyle || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Availability:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.availability || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Preference:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.preference || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Teaching Approach:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.teachingApproach ||
                    "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Is Private:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.isPrivate ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-semibold">Messages Allowed:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.messageAllowed
                    ? "Yes"
                    : "No"}
                </p>
                <p>
                  <span className="font-semibold">Notifications Allowed:</span>{" "}
                  {selectedUser.userDetailsToReturnDTO.notiAllowed
                    ? "Yes"
                    : "No"}
                </p>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Layout>
  );
};

export default Users;
