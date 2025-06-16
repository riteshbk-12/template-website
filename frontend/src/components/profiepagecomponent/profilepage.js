import { useState } from "react";
import ProfileHeader from "./profileheader";
import ActivityTabs from "./activitytabs";
import "../../static/profilecss/profilepage.css";
import r from "../../static/assets/r letter.png";


const ProfilePage = () => {
  // State for user data, now editable
  const [userData, setUserData] = useState({
    id: 1,
    name: "imuser",
    username: "@imuser",
    avatar:r||
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    coverPhoto:
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80",
    bio: "UI/UX designer and front-end developer with a passion for creating beautiful, functional templates. I specialize in responsive design and modern web technologies.",
    location: "San Francisco, CA",
    website: "https://janesmith.com",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
    twitter: "https://twitter.com/janesmith",
    joinDate: "January 15, 2023",
    stats: {
      templates: 24,
      followers: 1250,
      following: 86,
    },
  });

  // Function to update user data
  const updateUserData = (updatedData) => {
    setUserData((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <div className="profile-page">
      <ProfileHeader user={userData} updateUser={updateUserData} />
      <ActivityTabs userId={userData.id} />
    </div>
  );
};

export default ProfilePage;