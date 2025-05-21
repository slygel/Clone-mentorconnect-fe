import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Monitor,
  Headphones,
  MessageSquare,
  BarChart3,
  FileText,
  Wrench,
  User,
} from "lucide-react";
import { toast } from "react-toastify";

import { InputField } from "../components/layouts/InputField";
import { TextareaField } from "../components/layouts/TextareaField";
import { MultiSelectButtonGroup } from "../components/layouts/MultiSelectButtonGroup";
import { NavigationButtonGroup } from "../components/layouts/NavigationButtonGroup";
import { validateProfile } from "../utils/validateProfile";
import { useAuth } from "../contexts/AuthProvider";

import { getCurrentUser, updateUserDetails } from "../services/UserService";
import { convertDtoToUserData } from "../utils/convertDtoToUserData";
import { convertUserDataToApiFormat } from "../interfaces/UserData";

import type { UserData } from "../interfaces/UserData";
import { masterDataService } from "../services/MasterDataService";

const EditProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [availabilityOptions, setAvailabilityOptions] = useState<string[]>([]);
  const [expertiseOptions, setExpertiseOptions] = useState<string[]>([]);
  const [topicOptions, setTopicOptions] = useState<string[]>([]);
  const learningStyles = [
    "Visual",
    "Auditory",
    "Reading/Writing",
    "Kinesthetic",
  ];

  const navigate = useNavigate();
  const { authAxios } = useAuth();

  const fetchUserData = async () => {
    try {
      const data = await getCurrentUser(authAxios);
      const transformed = convertDtoToUserData(data);
      setUserData(transformed);
      setUserId(data.userID);
      setAvatarPreview(
        `data:image/jpeg;base64,${data.userDetailsToReturnDTO.avatar}`
      );
    } catch (err) {
      toast.error("Failed to load user data." + err);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchMasterData = async () => {
    try {
      const response = await masterDataService(authAxios);
      setAvailabilityOptions(response.appSettings.availabilities || []);
      setExpertiseOptions(response.appSettings.expertises || []);
      setTopicOptions(response.appSettings.preferences || []);
    } catch {
      setAvailabilityOptions([
        "Weekdays",
        "Weekends",
        "Mornings",
        "Afternoons",
        "Evenings",
      ]);
      setExpertiseOptions([
        "Leadership",
        "Programming",
        "Design",
        "Marketing",
        "Data Science",
        "Business",
        "Project Management",
        "Communication",
      ]);
      setTopicOptions([
        "Career Development",
        "Technical Skills",
        "Leadership",
        "Communication",
        "Work-Life Balance",
        "Industry Insights",
        "Networking",
        "Entrepreneurship",
      ]);
    }
  };

  useEffect(() => {
    fetchMasterData();
  }, [authAxios]);

  const updateUser = (data: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev!, ...data }));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > 1024 * 1024) {
        setErrors((prev) => ({ ...prev, avatar: "Image exceeds 1MB." }));
        return;
      }

      const allowed = ["image/jpeg", "image/png", "image/gif"];
      if (!allowed.includes(file.type)) {
        setErrors((prev) => ({ ...prev, avatar: "Invalid file type." }));
        return;
      }

      clearError("avatar");
      setAvatarPreview(URL.createObjectURL(file));
      updateUser({ avatarFile: file });
    }
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });
  };

  const handleSubmit = async () => {
    if (!userData) return;
    const validationErrors = validateProfile(userData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      toast.error("Please fix the errors in the form.");
      return;
    }

    try {
      const apiData = convertUserDataToApiFormat(userData);
      const u = apiData.userDetailsToAddDTO;
      const formData = new FormData();

      const fields: [string, string | File | undefined | null][] = [
        ["FullName", u.fullName],
        ["Bio", u.bio],
        ["Skills", u.skills],
        ["Experience", u.experience],
        ["PrefferedComm", u.prefferedComm.toString()],
        ["LearningGoal", u.learningGoal],
        ["SessionFreq", u.sessionFreq.toString()],
        ["SessionDur", u.sessionDur.toString()],
        ["PrefferedStyle", u.prefferedStyle.toString()],
        ["Availability", u.availability],
        ["Expertise", u.expertise],
        ["Preference", u.preference],
        ["IsPrivate", u.isPrivate.toString()],
        ["MessageAllowed", u.messageAllowed.toString()],
        ["NotiAllowed", u.notiAllowed.toString()],
        ["TeachingApproach", u.teachingApproaches],
        ["Avatar", u.avatarFile],
      ];

      fields.forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          formData.append(key, value);
        }
      });

      await updateUserDetails(authAxios, userId, formData);
      toast.success("Profile updated!");
    } catch {
      toast.error("Update failed. Try again.");
    }
  };

  if (!userData) return <div className="p-8 text-center">Loading...</div>;

  const isMentor = userData.role === "mentor";
  const isLearner = userData.role === "learner";

  const toggleList = (key: keyof UserData, value: string) => {
    const current = (userData[key] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    updateUser({ [key]: updated } as any);
  };

  return (
    <div className="min-h-screen bg-[#ECFAE5] flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Edit Your Profile
          </h1>

          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="w-25 h-25 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Avatar Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <label className="absolute -bottom-0 -right-0 bg-[#5F8B4C] hover:bg-[#3D8D7A] text-white p-1 rounded-full cursor-pointer">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              {errors.avatar && (
                <p className="text-red-500 text-sm mt-2">{errors.avatar}</p>
              )}
            </div>

            <div className="flex-1">
              <label className="block mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <InputField
                label=""
                id="fullName"
                type="text"
                value={userData.fullName}
                onChange={(v) => updateUser({ fullName: v })}
                error={errors.fullName}
                clearError={() => clearError("fullName")}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <TextareaField
            id="bio"
            label="Bio"
            value={userData.bio || ""}
            onChange={(v) => updateUser({ bio: v })}
            placeholder="Write a short bio about yourself..."
            error={errors.bio}
            clearError={() => clearError("bio")}
          />

          {isMentor && (
            <>
              <MultiSelectButtonGroup
                label="Areas of Expertise"
                options={expertiseOptions}
                selected={userData.areasOfExpertise}
                onToggle={(val) => toggleList("areasOfExpertise", val)}
                error={errors.areasOfExpertise}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <InputField
                  id="professionalSkills"
                  label="Professional Skills"
                  type="text"
                  value={userData.professionalSkills || ""}
                  onChange={(v) => updateUser({ professionalSkills: v })}
                  error={errors.professionalSkills}
                  clearError={() => clearError("professionalSkills")}
                />
                <InputField
                  id="industryExperience"
                  label="Industry Experience"
                  type="text"
                  value={userData.industryExperience || ""}
                  onChange={(v) => updateUser({ industryExperience: v })}
                  error={errors.industryExperience}
                  clearError={() => clearError("industryExperience")}
                />
              </div>
            </>
          )}

          {isLearner && (
            <>
              <MultiSelectButtonGroup
                label="Your Availability"
                options={availabilityOptions}
                selected={userData.availability}
                onToggle={(val) => toggleList("availability", val)}
                gridCols="flex justify-between"
              />
            </>
          )}

          <div className="mb-8">
            <label className="block text-gray-700 mb-2">
              Preferred communication method
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                type="button"
                className={`cursor-pointer p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                  userData.communicationMethod === "video"
                    ? "bg-[#C1D8C3] border-[#3D8D7A] text-gray-700"
                    : "bg-white border-gray-300 hover:border-[#3D8D7A] text-gray-700"
                }`}
                onClick={() => updateUser({ communicationMethod: "video" })}
              >
                <Monitor size={20} />
                <span>Video Call</span>
              </button>

              <button
                type="button"
                className={`p-4 cursor-pointer rounded-lg border-2 flex items-center justify-center gap-2 ${
                  userData.communicationMethod === "audio"
                    ? "bg-[#C1D8C3] border-[#3D8D7A] text-gray-700"
                    : "bg-white border-gray-300 hover:border-[#3D8D7A] text-gray-700"
                }`}
                onClick={() => updateUser({ communicationMethod: "audio" })}
              >
                <Headphones size={20} />
                <span>Audio Call</span>
              </button>

              <button
                type="button"
                className={`p-4 cursor-pointer rounded-lg border-2 flex items-center justify-center gap-2 ${
                  userData.communicationMethod === "text"
                    ? "bg-[#C1D8C3] border-[#3D8D7A] text-gray-700"
                    : "bg-white border-gray-300 hover:border-[#3D8D7A] text-gray-700"
                }`}
                onClick={() => updateUser({ communicationMethod: "text" })}
              >
                <MessageSquare size={20} />
                <span>Text Chat</span>
              </button>
            </div>
          </div>

          {isLearner && (
            <>
              <TextareaField
                id="learningObjectives"
                label="What do you hope to learn?"
                value={userData.learningObjectives || ""}
                onChange={(v) => updateUser({ learningObjectives: v })}
                placeholder="Describe your learning objectives..."
                error={errors.learningObjectives}
                clearError={() => clearError("learningObjectives")}
              />

              <div className="mb-8">
                <label className="block text-gray-700 mb-2">
                  Your preferred learning style
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {learningStyles.map((style) => (
                    <button
                      key={style}
                      type="button"
                      className={`cursor-pointer p-4 rounded-lg border-2 flex items-center justify-center gap-2 ${
                        userData.learningStyle === style.toLowerCase()
                          ? "bg-[#C1D8C3] border-[#3D8D7A] text-gray-700"
                          : "bg-white border-gray-300 hover:border-[#3D8D7A] text-gray-700"
                      }`}
                      onClick={() =>
                        updateUser({ learningStyle: style.toLowerCase() })
                      }
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <MultiSelectButtonGroup
                label="Topics you're interested in learning about"
                options={topicOptions}
                selected={userData.interestedTopics}
                onToggle={(val) => toggleList("interestedTopics", val)}
              />
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 mb-2">
                Preferred session frequency
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={userData.sessionFrequency}
                onChange={(e) =>
                  updateUser({ sessionFrequency: e.target.value })
                }
              >
                <option value="Weekly">Weekly</option>
                <option value="Bi-weekly">Bi-weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2">
                Preferred session duration
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg"
                value={userData.sessionDuration}
                onChange={(e) =>
                  updateUser({ sessionDuration: e.target.value })
                }
              >
                <option value="30 minutes">30 minutes</option>
                <option value="1 hour">1 hour</option>
                <option value="1.5 hours">1.5 hours</option>
                <option value="2 hours">2 hours</option>
              </select>
            </div>
          </div>

          {isMentor && (
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Your teaching approach (select all that apply)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  {
                    key: "Hands-on Practice",
                    label: "Hands-on Practice",
                    icon: <Wrench className="h-5 w-5" />,
                  },
                  {
                    key: "Discussion Based",
                    label: "Discussion Based",
                    icon: <MessageSquare className="h-5 w-5" />,
                  },
                  {
                    key: "Project Based",
                    label: "Project Based",
                    icon: <BarChart3 className="h-5 w-5" />,
                  },
                  {
                    key: "Lecture Style",
                    label: "Lecture Style",
                    icon: <FileText className="h-5 w-5" />,
                  },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    type="button"
                    className={`p-4 cursor-pointer rounded-lg border-2 flex items-center gap-3 ${
                      userData.teachingApproaches.includes(key)
                        ? "bg-[#C1D8C3] border-[#3D8D7A]"
                        : "bg-white border-gray-300 hover:border-[#3D8D7A]"
                    }`}
                    onClick={() => toggleList("teachingApproaches", key)}
                  >
                    {icon}
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Privacy */}
          <div className="border-t border-gray-200 my-8 pt-8 space-y-4">
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={userData.privateProfile}
                onChange={(e) =>
                  updateUser({ privateProfile: e.target.checked })
                }
                className="h-5 w-5 text-orange-500 rounded cursor-pointer"
              />
              <div>
                <div className="font-medium text-gray-700">Private profile</div>
                <div className="text-sm text-gray-500">
                  Only approved connections can view your full profile
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={userData.allowMessages}
                onChange={(e) =>
                  updateUser({ allowMessages: e.target.checked })
                }
                className="h-5 w-5 text-orange-500 rounded cursor-pointer"
              />
              <div>
                <div className="font-medium text-gray-700">Allow messages</div>
                <div className="text-sm text-gray-500">
                  Let others message you
                </div>
              </div>
            </label>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                checked={userData.receiveNotifications}
                onChange={(e) =>
                  updateUser({ receiveNotifications: e.target.checked })
                }
                className="h-5 w-5 text-orange-500 rounded cursor-pointer"
              />
              <div>
                <div className="font-medium text-gray-700">
                  Receive notifications
                </div>
                <div className="text-sm text-gray-500">
                  Get email and in-app notifications
                </div>
              </div>
            </label>
          </div>

          <NavigationButtonGroup
            backLabel="Back"
            submitLabel="Save Changes"
            onBack={() => navigate(-1)}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
