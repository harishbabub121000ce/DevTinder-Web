import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    username: "johndoe_dev",
    email: "john.doe@example.com",
    bio: "Full-stack developer passionate about creating innovative web applications. Love working with React, Node.js, and cloud technologies. Always eager to learn new technologies and collaborate on exciting projects!",
    skills: ["React", "Node.js", "TypeScript", "MongoDB", "AWS"],
    location: "San Francisco, CA",
    experience: "5 years",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.dev",
    availability: "Available for new projects",
    hourlyRate: "$75/hour",
    languages: ["English", "Spanish"],
    interests: ["Open Source", "Machine Learning", "UI/UX Design"]
  });

  const [newSkill, setNewSkill] = useState("");

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // Handle save logic here
    console.log("Profile updated:", profileData);
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
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
                  
                  <p className="text-gray-600 mb-4">@{profileData.username}</p>
                  
                  <div className="badge badge-primary mb-2">{profileData.availability}</div>
                  <p className="text-lg font-semibold text-green-600 mb-4">{profileData.hourlyRate}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>📍 {profileData.location}</p>
                    <p>💼 {profileData.experience} experience</p>
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
                        <span className="label-text font-medium">GitHub</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="github"
                          value={profileData.github}
                          onChange={handleChange}
                          className="input input-bordered w-full"
                        />
                      ) : (
                        <a href={profileData.github} className="link link-primary" target="_blank" rel="noopener noreferrer">
                          {profileData.github}
                        </a>
                      )}
                    </div>
                    
                    <div>
                      <label className="label">
                        <span className="label-text font-medium">LinkedIn</span>
                      </label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="linkedin"
                          value={profileData.linkedin}
                          onChange={handleChange}
                          className="input input-bordered w-full"
                        />
                      ) : (
                        <a href={profileData.linkedin} className="link link-primary" target="_blank" rel="noopener noreferrer">
                          {profileData.linkedin}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Bio, Skills, etc. */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bio */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">About Me</h3>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={profileData.bio}
                      onChange={handleChange}
                      className="textarea textarea-bordered w-full h-32"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Skills & Technologies</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {profileData.skills.map((skill, index) => (
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
                    ))}
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

              {/* Interests */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.interests.map((interest, index) => (
                      <div key={index} className="badge badge-secondary">
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages */}
              <div className="card bg-white shadow-lg">
                <div className="card-body">
                  <h3 className="card-title mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language, index) => (
                      <div key={index} className="badge badge-accent">
                        {language}
                      </div>
                    ))}
                  </div>
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