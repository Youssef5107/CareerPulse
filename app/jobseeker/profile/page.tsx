"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  description?: string | null;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate?: string | null;
}

interface UserProfile {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string;
  profile?: {
    id: string;
    headline?: string;
    location?: string;
    phone?: string;
    summary?: string;
    skills: string[];
    cvUrl?: string;
    bannerUrl?: string;
    experiences: WorkExperience[];
    educations: Education[];
  };
}

export default function ProfilePage() {
  const [userData, setUserData] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // File Upload References
  const cvInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  // Modals and Forms State
  const [activeModal, setActiveModal] = useState<
    "basic" | "summary" | "experience" | "education" | null
  >(null);

  const [basicForm, setBasicForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
  });

  const [summaryText, setSummaryText] = useState("");
  const [newSkill, setNewSkill] = useState("");

  const [expForm, setExpForm] = useState({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [eduForm, setEduForm] = useState({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
  });

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setUserData(data);
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchProfile();
    }, 0);
  }, []);

  const saveProfileData = async (payload: Record<string, unknown>) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updated = await res.json();
        setUserData(updated);
        setActiveModal(null);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Upload Handlers
  const handleCVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveProfileData({ cvUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveProfileData({ image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Create Experience or Education Entries via POST
  const handleAddDetail = async (
    type: "experience" | "education",
    data: Record<string, string>,
  ) => {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, data }),
      });

      if (res.ok) {
        fetchProfile();
        setActiveModal(null);
        if (type === "experience") {
          setExpForm({
            title: "",
            company: "",
            startDate: "",
            endDate: "",
            description: "",
          });
        } else {
          setEduForm({
            institution: "",
            degree: "",
            startDate: "",
            endDate: "",
          });
        }
      }
    } catch (error) {
      console.error(`Failed to add ${type}:`, error);
    }
  };

  // Skill Management
  const handleAddSkill = () => {
    if (!newSkill.trim() || !userData) return;
    const currentSkills = userData.profile?.skills || [];
    if (currentSkills.includes(newSkill.trim())) return;
    saveProfileData({ skills: [...currentSkills, newSkill.trim()] });
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    if (!userData) return;
    const currentSkills = userData.profile?.skills || [];
    saveProfileData({
      skills: currentSkills.filter((s) => s !== skillToRemove),
    });
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 font-semibold">
        Loading Profile...
      </div>
    );
  }

  const profile = userData?.profile;

  return (
    <div className="flex-1 p-4 md:p-12 max-w-[1020px] mx-auto w-full flex flex-col gap-6">
      {/* Invisible HTML File Inputs */}
      <input
        type="file"
        ref={cvInputRef}
        onChange={handleCVUpload}
        accept=".pdf,.doc,.docx"
        className="hidden"
      />
      <input
        type="file"
        ref={avatarInputRef}
        onChange={handleAvatarUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Banner & Header Info */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden relative">
        <div className="h-48 w-full bg-gradient-to-r from-slate-200 to-slate-300 relative">
          {profile?.bannerUrl && (
            <Image
              src={profile.bannerUrl}
              alt="Banner"
              fill
              className="object-cover"
            />
          )}
        </div>

        <div className="px-6 pb-6 relative">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 sm:-mt-12 mb-4 gap-4">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden relative bg-slate-100 shadow-sm z-10 flex items-center justify-center">
                {userData?.image ? (
                  <Image
                    src={userData.image}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[48px] text-slate-400">
                    person
                  </span>
                )}
              </div>
              <button
                onClick={() => avatarInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-[#142175] text-white p-1.5 rounded-full shadow-md hover:bg-[#2e3a8c] transition-colors z-20"
                title="Upload Profile Picture"
              >
                <span className="material-symbols-outlined text-[16px]">
                  photo_camera
                </span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => cvInputRef.current?.click()}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  upload_file
                </span>
                {profile?.cvUrl ? "Change Resume" : "Upload Resume"}
              </button>

              <button
                onClick={() => {
                  setBasicForm({
                    firstName: userData?.firstName || "",
                    lastName: userData?.lastName || "",
                    email: userData?.email || "",
                    phone: profile?.phone || "",
                    location: profile?.location || "",
                    headline: profile?.headline || "",
                  });
                  setActiveModal("basic");
                }}
                className="px-5 py-2 rounded-xl bg-[#142175] text-white font-semibold text-xs hover:bg-[#142175]/90 transition-all shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">
                  edit
                </span>
                Edit Profile
              </button>
            </div>
          </div>

          {/* User Meta */}
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">
              {userData?.firstName || userData?.lastName
                ? `${userData?.firstName || ""} ${userData?.lastName || ""}`
                : "Add Your Name"}
            </h2>
            <p className="text-base text-slate-600 mb-4">
              {profile?.headline || "No headline provided yet."}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  location_on
                </span>
                {profile?.location || "Location not specified"}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  mail
                </span>
                {userData?.email || "No email provided"}
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[18px]">
                  call
                </span>
                {profile?.phone || "No phone added"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* About / Summary Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#142175]">
              person_pin
            </span>
            About Me
          </h3>
          <button
            onClick={() => {
              setSummaryText(profile?.summary || "");
              setActiveModal("summary");
            }}
            className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors"
            title="Edit About Summary"
          >
            <span className="material-symbols-outlined text-[20px]">edit</span>
          </button>
        </div>
        {profile?.summary ? (
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {profile.summary}
          </p>
        ) : (
          <p className="text-sm text-slate-400 italic">
            Add a brief summary to introduce yourself to employers.
          </p>
        )}
      </section>

      {/* Integrated Skills Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#142175]">
              psychology
            </span>
            Skills
          </h3>
        </div>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {profile?.skills && profile.skills.length > 0 ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50/80 text-[#142175] text-xs font-semibold rounded-xl border border-blue-100 flex items-center gap-1.5"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    close
                  </span>
                </button>
              </span>
            ))
          ) : (
            <p className="text-sm text-slate-400 italic">
              No skills added yet.
            </p>
          )}
        </div>

        {/* Add Skill Input Row */}
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            placeholder="Add a skill (e.g. React.js, Management)"
            className="w-full text-xs p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#142175] bg-slate-50/50 focus:bg-white transition-all"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddSkill();
              }
            }}
          />
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-[#142175] text-white text-xs font-medium rounded-xl hover:bg-[#2e3a8c] transition-colors shrink-0"
          >
            Add Skill
          </button>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#142175]">
              work_history
            </span>
            Experience
          </h3>
          <button
            onClick={() => setActiveModal("experience")}
            className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {profile?.experiences && profile.experiences.length > 0 ? (
          <div className="relative border-l-2 border-slate-200 ml-2 space-y-6 pl-6 pb-2">
            {profile.experiences.map((exp) => (
              <div key={exp.id} className="relative">
                <span className="absolute -left-[31px] top-1 bg-white border-2 border-[#142175] w-4 h-4 rounded-full"></span>
                <h4 className="text-lg font-semibold text-slate-900">
                  {exp.title}
                </h4>
                <p className="text-xs font-semibold text-[#142175] mb-1">
                  {exp.company}
                </p>
                <p className="text-xs font-semibold text-slate-400 mb-2">
                  {exp.startDate} - {exp.endDate || "Present"}
                </p>
                {exp.description && (
                  <p className="text-sm text-slate-600">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No work experience added yet.
          </p>
        )}
      </section>

      {/* Education Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#142175]">
              school
            </span>
            Education
          </h3>
          <button
            onClick={() => setActiveModal("education")}
            className="text-[#142175] hover:bg-slate-50 p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>

        {profile?.educations && profile.educations.length > 0 ? (
          <div className="space-y-4">
            {profile.educations.map((edu) => (
              <div key={edu.id} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-slate-600">
                    account_balance
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-900">
                    {edu.institution}
                  </h4>
                  <p className="text-sm text-slate-600">{edu.degree}</p>
                  <p className="text-xs font-semibold text-slate-400 mt-1">
                    {edu.startDate} - {edu.endDate || "Present"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">
            No education history added yet.
          </p>
        )}
      </section>

      {/* Edit Basic Profile Modal */}
      {activeModal === "basic" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Edit Basic Details
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={basicForm.firstName}
                onChange={(e) =>
                  setBasicForm({ ...basicForm, firstName: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={basicForm.lastName}
                onChange={(e) =>
                  setBasicForm({ ...basicForm, lastName: e.target.value })
                }
              />
            </div>
            <input
              type="text"
              placeholder="Headline / Professional Title"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={basicForm.headline}
              onChange={(e) =>
                setBasicForm({ ...basicForm, headline: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={basicForm.email}
              onChange={(e) =>
                setBasicForm({ ...basicForm, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={basicForm.phone}
              onChange={(e) =>
                setBasicForm({ ...basicForm, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={basicForm.location}
              onChange={(e) =>
                setBasicForm({ ...basicForm, location: e.target.value })
              }
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => saveProfileData(basicForm)}
                className="px-4 py-2 text-xs bg-[#142175] text-white rounded-xl"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Summary Modal */}
      {activeModal === "summary" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Edit About Summary
            </h3>
            <textarea
              placeholder="Tell employers about your experience, achievements, or career aspirations..."
              className="w-full border p-3 rounded-xl text-sm outline-none focus:border-[#142175]"
              rows={5}
              value={summaryText}
              onChange={(e) => setSummaryText(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => saveProfileData({ summary: summaryText })}
                className="px-4 py-2 text-xs bg-[#142175] text-white rounded-xl"
              >
                Save Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Experience Modal */}
      {activeModal === "experience" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Add Work Experience
            </h3>
            <input
              type="text"
              placeholder="Job Title"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={expForm.title}
              onChange={(e) =>
                setExpForm({ ...expForm, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Company Name"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={expForm.company}
              onChange={(e) =>
                setExpForm({ ...expForm, company: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Start Date (e.g. Jan 2022)"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={expForm.startDate}
                onChange={(e) =>
                  setExpForm({ ...expForm, startDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="End Date (e.g. Present)"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={expForm.endDate}
                onChange={(e) =>
                  setExpForm({ ...expForm, endDate: e.target.value })
                }
              />
            </div>
            <textarea
              placeholder="Description"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              rows={3}
              value={expForm.description}
              onChange={(e) =>
                setExpForm({ ...expForm, description: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddDetail("experience", expForm)}
                className="px-4 py-2 text-xs bg-[#142175] text-white rounded-xl"
              >
                Save Experience
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Education Modal */}
      {activeModal === "education" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add Education</h3>
            <input
              type="text"
              placeholder="Institution Name"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={eduForm.institution}
              onChange={(e) =>
                setEduForm({ ...eduForm, institution: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Degree / Major"
              className="w-full border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
              value={eduForm.degree}
              onChange={(e) =>
                setEduForm({ ...eduForm, degree: e.target.value })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Start Date (e.g. 2018)"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={eduForm.startDate}
                onChange={(e) =>
                  setEduForm({ ...eduForm, startDate: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="End Date (e.g. 2022)"
                className="border p-2.5 rounded-xl text-sm outline-none focus:border-[#142175]"
                value={eduForm.endDate}
                onChange={(e) =>
                  setEduForm({ ...eduForm, endDate: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 text-xs border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddDetail("education", eduForm)}
                className="px-4 py-2 text-xs bg-[#142175] text-white rounded-xl"
              >
                Save Education
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
