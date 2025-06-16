import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaGlobe,
  FaGithub,
  FaLinkedinIn,
  FaTwitter,
  FaCalendarAlt,
  FaPencilAlt,
} from "react-icons/fa";
import "../../static/profilecss/profileheader.css";

const ProfileHeader = ({ user, updateUser, isGuest }) => {
  // Default values for guest or missing data
  const defaultUser = {
    name: "Guest User",
    username: "guest",
    avatar: "/placeholder.svg",
    coverPhoto: "",
    bio: "No bio available",
    location: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
    joinDate: "Just now",
    stats: { templates: 0 }
  };

  // Use either provided user data or default data
  const userData = isGuest ? defaultUser : {
    ...defaultUser,
    ...user
  };

  // State for controlling modals
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showCoverModal, setShowCoverModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // State for temporary data during editing
  const [avatarPreview, setAvatarPreview] = useState(userData.avatar);
  const [coverPreview, setCoverPreview] = useState(userData.coverPhoto);
  const [formData, setFormData] = useState({
    bio: userData.bio,
    location: userData.location,
    website: userData.website,
    github: userData.github,
    linkedin: userData.linkedin,
    twitter: userData.twitter,
  });

  // Handle input changes in the profile form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar file upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cover photo file upload
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Save avatar changes
  const saveAvatar = () => {
    if (isGuest) {
      alert("Guest users cannot save changes. Please login or register.");
      setShowAvatarModal(false);
      return;
    }
    updateUser({ avatar: avatarPreview });
    setShowAvatarModal(false);
  };

  // Save cover photo changes
  const saveCover = () => {
    if (isGuest) {
      alert("Guest users cannot save changes. Please login or register.");
      setShowCoverModal(false);
      return;
    }
    updateUser({ coverPhoto: coverPreview });
    setShowCoverModal(false);
  };

  // Save profile details changes
  const saveProfile = () => {
    if (isGuest) {
      alert("Guest users cannot save changes. Please login or register.");
      setShowProfileModal(false);
      return;
    }
    updateUser(formData);
    setShowProfileModal(false);
  };

  // Cancel editing (reset previews and form data)
  const cancelEdit = (type) => {
    if (type === "avatar") {
      setAvatarPreview(userData.avatar);
      setShowAvatarModal(false);
    } else if (type === "cover") {
      setCoverPreview(userData.coverPhoto);
      setShowCoverModal(false);
    } else if (type === "profile") {
      setFormData({
        bio: userData.bio,
        location: userData.location,
        website: userData.website,
        github: userData.github,
        linkedin: userData.linkedin,
        twitter: userData.twitter,
      });
      setShowProfileModal(false);
    }
  };

  return (
    <div className="profile-header">
      {/* Cover Photo */}
      <div 
        className="profile-cover" 
        style={{ backgroundImage: userData.coverPhoto ? `url(${userData.coverPhoto})` : "none" }}
      >
        <button className="edit-cover-btn" onClick={() => setShowCoverModal(true)}>
          <FaPencilAlt /> Edit Cover
        </button>
      </div>

      {/* Profile Content */}
      <div className="profile-content">
        <div className="profile-avatar-container">
          <div className="profile-avatar">
            <img src={userData.avatar} alt={userData.name} />
            <button className="edit-avatar-btn" onClick={() => setShowAvatarModal(true)}>
              <FaPencilAlt />
            </button>
          </div>
        </div>

        <div className="profile-info-container">
          <div className="profile-info">
            <div className="profile-name-section">
              <div>
                <h1>{userData.name}</h1>
                <span className="username">{userData.username}</span>
              </div>
              <button className="edit-profile-btn" onClick={() => setShowProfileModal(true)}>
                Edit Profile
              </button>
            </div>

            <div className="profile-bio-box">
              <p>{userData.bio}</p>
            </div>

            <div className="profile-details">
              {userData.location && (
                <div className="profile-detail">
                  <FaMapMarkerAlt />
                  <span>{userData.location}</span>
                </div>
              )}
              <div className="profile-detail">
                <FaCalendarAlt />
                <span>Joined {userData.joinDate}</span>
              </div>
            </div>

            <div className="profile-links">
              {userData.website && (
                <a href={userData.website} target="_blank" rel="noopener noreferrer" className="profile-link">
                  <FaGlobe />
                  <span>Website</span>
                </a>
              )}
              {userData.github && (
                <a href={userData.github} target="_blank" rel="noopener noreferrer" className="profile-link">
                  <FaGithub />
                  <span>GitHub</span>
                </a>
              )}
              {userData.linkedin && (
                <a href={userData.linkedin} target="_blank" rel="noopener noreferrer" className="profile-link">
                  <FaLinkedinIn />
                  <span>LinkedIn</span>
                </a>
              )}
              {userData.twitter && (
                <a href={userData.twitter} target="_blank" rel="noopener noreferrer" className="profile-link">
                  <FaTwitter />
                  <span>Twitter</span>
                </a>
              )}
            </div>

            <div className="profile-stats">
              <div className="stat">
                <span className="stat-value">{userData.stats.templates}</span>
                <span className="stat-label">Templates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avatar Edit Modal */}
      {showAvatarModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Avatar</h2>
            <img src={avatarPreview} alt="Avatar Preview" className="modal-preview" />
            <input type="file" accept="image/*" onChange={handleAvatarChange} />
            <div className="modal-buttons">
              <button onClick={saveAvatar}>Save</button>
              <button onClick={() => cancelEdit("avatar")}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Cover Photo Edit Modal */}
      {showCoverModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Cover Photo</h2>
            {coverPreview && (
              <img src={coverPreview} alt="Cover Preview" className="modal-preview" />
            )}
            <input type="file" accept="image/*" onChange={handleCoverChange} />
            <div className="modal-buttons">
              <button onClick={saveCover}>Save</button>
              <button onClick={() => cancelEdit("cover")}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Details Edit Modal */}
      {showProfileModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Edit Profile</h2>
            <form className="edit-profile-form">
              <label>
                Bio
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Enter your bio"
                />
              </label>
              <label>
                Location
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter your location"
                />
              </label>
              <label>
                Website
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  placeholder="Website URL"
                />
              </label>
              <label>
                GitHub
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="GitHub URL"
                />
              </label>
              <label>
                LinkedIn
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleInputChange}
                  placeholder="LinkedIn URL"
                />
              </label>
              <label>
                Twitter
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleInputChange}
                  placeholder="Twitter URL"
                />
              </label>
              <div className="modal-buttons">
                <button type="button" onClick={saveProfile}>
                  Save
                </button>
                <button type="button" onClick={() => cancelEdit("profile")}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;