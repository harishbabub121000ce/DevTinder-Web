import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { toast } from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((store) => store.user);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    gender: "",
    photoUrl: "",
    about: "",
    skills: []
  });

  // Update profileData when user data changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        age: user.age || "",
        gender: user.gender || "",
        photoUrl: user.photoUrl || "https://cdn.pixabay.com/photo/2017/02/23/13/05/avatar-2092113_1280.png",
        about: user.about || "Hey! Send me a connection request if you want to connect with me",
        skills: user.skills || []
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      // Create a copy of profileData without email
      const { email, ...profileDataWithoutEmail } = profileData;
      
      // Convert age to number if it exists
      // if (profileDataWithoutEmail.age) {
      //   profileDataWithoutEmail.age = parseInt(profileDataWithoutEmail.age, 10);
      // }
      
      // Call API to update profile
      const response = await fetch(`${BASE_URL}/profile/edit`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(profileDataWithoutEmail),
      });

      if (response.ok) {
        setIsEditing(false);
        // success toast message
        toast.success("Profile updated successfully");
      } else {
        // error toast message
        toast.error("Failed to update profile");
      }
    } catch (error) {
      // error toast message
      toast.error("Error updating profile");
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData({
        ...profileData,
        skills: [...profileData.skills, newSkill.trim()]
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setProfileData({
      ...profileData,
      skills: profileData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const [newSkill, setNewSkill] = useState("");

  // Show loading or redirect if no user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
          <p className="text-gray-600">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="btn btn-primary"
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <div className="card bg-white shadow-lg">
                <div className="card-body text-center">
                  <div className="avatar mb-4">
                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={profileData.photoUrl}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="First Name"
                        maxLength={20}
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        placeholder="Last Name"
                      />
                    </div>
                  ) : (
                    <h2 className="text-2xl font-bold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                  )}
                  
                  <p className="text-gray-600 mb-4">{profileData.email}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    {profileData.age && <p>🎂 {profileData.age} years old</p>}
                    {profileData.gender && <p>👤 {profileData.gender}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card bg-white shadow-lg mt-6">
                <div className="card-body">
                  <h3 className="card-title mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleChange}
                          className="input input-bordered w-full"
                        />
                      ) : (
                        <p className="text-gray-700">{profileData.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Age</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="number"
                          name="age"
                          value={profileData.age}
                          onChange={handleChange}
                          className="input input-bordered w-full"
                          placeholder="Enter your age"
                          min="18"
                        />
                      ) : (
                        <p className="text-gray-700">{profileData.age || "Not specified"}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">Gender</span>
                      </label>
                      {isEditing ? (
                        <select
                          name="gender"
                          value={profileData.gender}
                          onChange={handleChange}
                          className="select select-bordered w-full"
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="text-gray-700">{profileData.gender || "Not specified"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - About, Skills, etc. */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">About Me</h3>
                  {isEditing ? (
                    <textarea
                      name="about"
                      value={profileData.about}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full h-32"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">
                      {profileData.about || "No bio available. Click 'Edit Profile' to add one."}
                    </p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.skills && profileData.skills.length > 0 ? (
                      profileData.skills.map((skill, index) => (
                        <div key={index} className="badge badge-outline badge-lg">
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-2 text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">No skills added yet.</p>
                    )}
                  </div>
                  
                  {isEditing && (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        className="input input-bordered flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button onClick={addSkill} className="btn btn-primary">
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Picture URL */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Profile Picture</h3>
                  {isEditing ? (
                    <input
                      type="url"
                      name="photoUrl"
                      value={profileData.photoUrl}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Enter profile picture URL"
                    />
                  ) : (
                    <p className="text-gray-700 break-all">{profileData.photoUrl}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;