import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile, checkAuth, isCheckingAuth } = useAuthStore();
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Fetch authUser when component mounts
  useEffect(() => {
    checkAuth();  // Ensure authUser is fetched on first render
  }, []);  // <-- Runs only once on mount

  console.log("Auth User Data:", authUser);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);

      // Ensure authUser is loaded before updating profile
      if (authUser) {
        await updateProfile({ profilePic: base64Image });
      }
    };
  };

  if (isCheckingAuth) {
    return <p className="text-center mt-10">Loading...</p>; // Show loading state while checking auth
  }

  return (
    <div className="h-[600px] flex flex-col items-center pt-10 p-4">
      <h1 className="text-xl font-semibold text-center mb-4">Profile</h1>

      <div className="w-full max-w-md bg-base-300 rounded-lg p-6 space-y-6">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={selectedImage || authUser?.profilePic || "/avatar.png"}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-base-content p-2 rounded-full cursor-pointer transition-all
              ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}
            >
              <Camera className="w-4 h-4 text-white" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-xs text-zinc-400 mt-2">
            {isUpdatingProfile ? "Uploading..." : "Tap to change photo"}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <User className="w-4 h-4" /> <span>Username:</span>
          </div>
          <p className="p-2 bg-base-200 rounded border">{authUser?.username || "N/A"}</p>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <Mail className="w-4 h-4" /> <span>Email:</span>
          </div>
          <p className="p-2 bg-base-200 rounded border">{authUser?.email || "N/A"}</p>
        </div>

        <div className="text-sm bg-base-200 p-4 rounded">
          <p className="flex justify-between border-b pb-2">
            <span>Member Since:</span>
            <span>{authUser?.createdAt?.split("T")[0] || "N/A"}</span>
          </p>
          <p className="flex justify-between mt-2">
            <span>Account Status:</span>
            <span className="text-green-500">Active</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
