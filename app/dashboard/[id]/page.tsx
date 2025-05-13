"use client";

import DrawResume from "@/app/_Components/drawResume";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { Drawer } from "vaul";

function Dashboard() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [address, setAddress] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");

  /* Experience Section */
  const [experiences, setExperiences] = useState([]);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [current, setCurrent] = useState(false);
  const [description, setDescription] = useState("");
  const handleSave = () => {
    if (
      !company.trim() ||
      !role.trim() ||
      !location.trim() ||
      !startDate.trim() ||
      (!current && !endDate.trim()) ||
      !description.trim()
    ) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newExperience = {
      company,
      role,
      location,
      startDate,
      endDate: current ? "Hozirgi vaqtgacha" : endDate,
      description,
    };

    // @ts-ignore
    setExperiences([newExperience, ...experiences]);

    setCompany("");
    setRole("");
    setLocation("");
    setStartDate("");
    setEndDate("");
    setCurrent(false);
    setDescription("");

    toast.success("Tajriba muvaffaqiyatli qo‘shildi!");
  };
  const deleteExperience = (index: number) => {
    const newExperiences = [...experiences];
    newExperiences.splice(index, 1);
    setExperiences(newExperiences);
  };

  // Projects
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [deployLink, setDeployLink] = useState("");
  const [repoLink, setRepoLink] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const handleSaveProject = () => {
    if (!projectName || !deployLink || !repoLink || !projectDescription) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");

      return;
    }

    const newProject = {
      projectName,
      deployLink,
      repoLink,
      projectDescription,
    };

    // @ts-ignore
    setProjects([newProject, ...projects]);

    setProjectName("");
    setDeployLink("");
    setRepoLink("");
    setProjectDescription("");
  };
  const deleteProjects = (index: number) => {
    const newProjects = [...projects];
    newProjects.splice(index, 1);
    setProjects(newProjects);
  };

  // Education
  const [educations, setEducations] = useState([]);
  const [educationInstitution, setEducationInstitution] = useState("");
  const [educationDegree, setEducationDegree] = useState("");
  const [educationStudy, setEducationStudy] = useState("");
  const [educationStartDate, setEducationStartDate] = useState("");
  const [educationEndDate, setEducationEndDate] = useState("");
  const [educationCurrent, setEducationCurrent] = useState(false);
  const [educationDescription, setEducationDescription] = useState("");
  const handleSaveEducation = () => {
    if (
      !educationInstitution ||
      !educationDegree ||
      !educationStudy ||
      !educationStartDate ||
      !educationDescription ||
      (!educationCurrent && !educationEndDate)
    ) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newEducation = {
      institution: educationInstitution,
      degree: educationDegree,
      study: educationStudy,
      startDate: educationStartDate,
      endDate: educationEndDate,
      current: educationCurrent,
      description: educationDescription,
    };

    // @ts-ignore
    setEducations((prev) => [...prev, newEducation]);

    // Reset fields
    setEducationInstitution("");
    setEducationDegree("");
    setEducationStudy("");
    setEducationStartDate("");
    setEducationEndDate("");
    setEducationCurrent(false);
    setEducationDescription("");
  };

  const handleDeleteEducation = (index: number) => {
    const newProjects = [...educations];
    newProjects.splice(index, 1);
    setEducations(newProjects);
  };

  // Skill
  const [skill, setSkills] = useState([]);
  const [skillName, setSkillName] = useState("");
  const [skillList, setSkillList] = useState("");
  const handleSaveSkills = () => {
    if (!skillName || !skillList) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newSkills = {
      name: skillName,
      list: skillList,
    };
    // @ts-ignore
    setSkills((prev) => [...prev, newSkills]);

    setSkillName("");
    setSkillList("");
  };
  const handleDeleteSkill = (index: number) => {
    const newProjects = [...skill];
    newProjects.splice(index, 1);
    setSkills(newProjects);
  };

  // Language
  const [language, setLanguages] = useState([]);
  const [languageName, setLanguageName] = useState("");
  const [languageleave, setLanguageleave] = useState("");
  const handleSaveLanguage = () => {
    if (!languageName || !languageleave) {
      toast.error("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    const newLanguage = {
      languageName: languageName,
      languageleave: languageleave,
    };
    // @ts-ignore
    setLanguages((prev) => [...prev, newLanguage]);

    setLanguageName("");
    setLanguageleave("");
  };
  const handleDeleteLanguage = (index: number) => {
    const newProjects = [...language];
    newProjects.splice(index, 1);
    setLanguages(newProjects);
  };

  const supabase = createClient();

  const fullSave = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !mobileNumber.trim() ||
      !linkedIn.trim() ||
      !github.trim() ||
      !portfolio.trim() ||
      !address.trim() ||
      !jobTitle.trim() ||
      !message.trim() ||
      experiences.length === 0 ||
      projects.length === 0 ||
      educations.length === 0 ||
      skill.length === 0 ||
      language.length === 0
    ) {
      toast.error(
        "Iltimos, barcha maydonlarni to‘ldiring va bo‘sh joylar qoldirmang!"
      );
      return;
    }

    try {
      const { data, error } = await supabase.from("Resume_Builder").insert([
        {
          userId: id,
          full_name: fullName,
          email: email,
          mobile_number: mobileNumber,
          linkedIn: linkedIn,
          github: github,
          portfolio: portfolio,
          address: address,
          job_title: jobTitle,
          summary: message,
          experiences: experiences,
          projects: projects,
          educations: educations,
          skills: skill,
          languages: language,
        },
      ]);

      if (error) {
        toast.error("Xato yuz berdi: " + error.message);
      } else {
        toast.success("Resume muvaffaqiyatli saqlandi!");
      }
    } catch (err) {
      toast.error("Xato yuz berdi ");
    }
  };

  return (
    <div className="max-w-[1520] mx-auto flex items-start justify-content-between p-4">
      <div className=" p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <ToastContainer />
        {/* General - Social Section */}
        <div>
          <h5 className="text-sm font-bold mb-4">GENERAL - Social</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Mobile Number</label>
              <input
                type="tel"
                placeholder="+998 91 423 45 67"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">LinkedIn</label>
              <input
                type="url"
                placeholder="linkedin.com/username"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">GitHub</label>
              <input
                type="url"
                placeholder="github.com/username"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Portfolio</label>
              <input
                type="url"
                placeholder="example.com"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={portfolio}
                onChange={(e) => setPortfolio(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Address</label>
              <input
                type="text"
                placeholder="Tashkent, Uzbekistan"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Job Title</label>
              <input
                type="text"
                placeholder="Frontend Developer"
                className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">SUMMARY</label>
            <textarea
              placeholder="Write your message..."
              className="mt-1 mb-3 h-24 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Experience Section */}
        <div>
          {experiences.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto mt-4">
              {experiences.map((exp: any, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md shadow-md h-fit relative"
                >
                  <h4 className="font-bold text-lg mb-1">{exp.company}</h4>

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Role:</span> {exp.role}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {exp.location}
                  </p>

                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Duration:</span>{" "}
                    {exp.startDate} - {exp.endDate || "Present"}
                  </p>

                  {exp.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {exp.description}
                    </p>
                  )}

                  <button
                    onClick={() => deleteExperience(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Drawer.Root>
            <h5 className="text-sm font-bold mt-6 mb-2">EXPERIENCE</h5>

            <Drawer.Trigger asChild>
              <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg text-center hover:bg-gray-100 transition cursor-pointer mb-3 w-full">
                <button className="text-black font-medium">
                  + Add New Item
                </button>
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />

              <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg outline-none">
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-4">
                  <Drawer.Title className="text-xl font-semibold text-center">
                    Your Experiences
                  </Drawer.Title>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company name"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        placeholder="Enter role"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter location"
                      className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        disabled={current}
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={current}
                      onChange={() => setCurrent(!current)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <label className="text-sm font-medium">
                      Hozir ham shu yerda ishlayman
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Write your description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    className="bg-black text-white rounded-md py-2 px-6 hover:bg-gray-800 transition self-center w-32"
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Projects Section */}
        <div>
          {projects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto mt-4">
              {projects.map((exp: any, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md shadow-md h-fit relative"
                >
                  <h4 className="font-bold text-lg mb-1">{exp.projectName}</h4>

                  {exp.deployLink && (
                    <p className="text-sm text-blue-600 mb-1 break-words">
                      <span className="font-semibold">Live:</span>
                      {exp.deployLink}
                    </p>
                  )}

                  {exp.repoLink && (
                    <p className="text-sm text-gray-700 mb-1 break-words">
                      <span className="font-semibold">Repo:</span>{" "}
                      {exp.repoLink}
                    </p>
                  )}

                  {exp.projectDescription && (
                    <p className="text-sm text-gray-500 mt-2">
                      {exp.projectDescription}
                    </p>
                  )}

                  <button
                    onClick={() => deleteProjects(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Drawer.Root>
            <h5 className="text-sm font-bold mt-6 mb-2">PROJECTS</h5>
            <Drawer.Trigger asChild>
              <div className="border-dashed border-2 border-gray-300 p-4 text-center mb-3 w-full cursor-pointer hover:bg-gray-50 transition">
                <button className="text-black font-medium">
                  + Add New Project
                </button>
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg outline-none">
                <div className="flex flex-col gap-3 max-w-md mx-auto p-6">
                  <Drawer.Title className="text-xl font-semibold text-center">
                    Add New Project
                  </Drawer.Title>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Project Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Deploy Link
                      </label>
                      <input
                        type="text"
                        placeholder="Enter deploy link"
                        value={deployLink}
                        onChange={(e) => setDeployLink(e.target.value)}
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Repository Link
                      </label>
                      <input
                        type="text"
                        placeholder="Enter repository link"
                        value={repoLink}
                        onChange={(e) => setRepoLink(e.target.value)}
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Write your description"
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded resize-none focus:border-blue-500 outline-none"
                      rows={4}
                    />
                  </div>

                  <button
                    onClick={handleSaveProject}
                    className="bg-black text-white rounded py-2 px-6 hover:bg-gray-800 transition self-center w-32"
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Education Section */}
        <div>
          {educations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto mt-4">
              {educations.map((edu: any, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md shadow-md h-fit relative"
                >
                  <h4 className="font-bold text-lg mb-1">{edu.institution}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Degree:</span> {edu.degree}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Field:</span> {edu.study}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Duration:</span>{" "}
                    {edu.startDate} -{" "}
                    {edu.current ? "Hozirgi Vaqtgacha" : edu.endDate}
                  </p>
                  {edu.description && (
                    <p className="text-sm text-gray-500 mt-2">
                      {edu.description}
                    </p>
                  )}
                  <button
                    onClick={() => handleDeleteEducation(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Drawer.Root>
            <h5 className="text-sm font-bold mt-6 mb-2">EDUCATION</h5>
            <Drawer.Trigger asChild>
              <div className="border-dashed border-2 border-gray-300 p-4 text-center mb-3 w-full">
                <button className="text-black">Add New Item +</button>
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />

              <Drawer.Content className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-lg outline-none">
                <div className="p-6 max-w-lg mx-auto flex flex-col gap-3">
                  <Drawer.Title className="text-xl font-semibold text-center">
                    Institution
                  </Drawer.Title>

                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">
                      Institution Name
                    </label>
                    <input
                      type="text"
                      value={educationInstitution}
                      onChange={(e) => setEducationInstitution(e.target.value)}
                      placeholder="Enter institution name"
                      className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Degree
                      </label>
                      <input
                        type="text"
                        value={educationDegree}
                        onChange={(e) => setEducationDegree(e.target.value)}
                        placeholder="Enter degree name"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Field of Study
                      </label>
                      <input
                        type="text"
                        value={educationStudy}
                        onChange={(e) => setEducationStudy(e.target.value)}
                        placeholder="Enter field of study"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={educationStartDate}
                        onChange={(e) => setEducationStartDate(e.target.value)}
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={educationEndDate}
                        onChange={(e) => setEducationEndDate(e.target.value)}
                        disabled={educationCurrent}
                        className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={educationCurrent}
                      onChange={() => setEducationCurrent(!educationCurrent)}
                      className="w-4 h-4 accent-blue-500"
                    />
                    <label className="text-sm font-medium">
                      Hozir ham shu yerda o`qiyman
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <textarea
                      placeholder="Write your description"
                      value={educationDescription}
                      onChange={(e) => setEducationDescription(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 outline-none resize-none"
                    />
                  </div>

                  <button
                    onClick={handleSaveEducation}
                    className="bg-black text-white rounded-md py-2 px-6 hover:bg-gray-800 transition self-center w-32"
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Skills Section */}
        <div>
          {skill.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto mt-4">
              {skill.map((edu: any, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md shadow-md h-fit relative"
                >
                  <h4 className="font-bold text-lg mb-1">{edu.name}</h4>
                  <p className="text-sm text-gray-600 mb-1">{edu.list}</p>

                  <button
                    onClick={() => handleDeleteSkill(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Drawer.Root>
            <h5 className="text-sm font-bold mt-6 mb-2">SKILLS</h5>

            <Drawer.Trigger asChild>
              <div className="border-dashed border-2 border-gray-300 p-4 text-center mb-3 w-full">
                <button className="text-black">Add New Item +</button>
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-white rounded-t-2xl h-fit fixed bottom-0 left-0 right-0 outline-none">
                <div className="p-6 flex flex-col gap-4 w-1/4 mx-auto">
                  <Drawer.Title className="text-xl font-semibold text-center">
                    Your Skills
                  </Drawer.Title>

                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Skill
                      </label>
                      <input
                        type="text"
                        value={skillName}
                        onChange={(e) => setSkillName(e.target.value)}
                        placeholder="Enter skill"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Skill{" "}
                      </label>
                      <input
                        type="text"
                        value={skillList}
                        onChange={(e) => setSkillList(e.target.value)}
                        placeholder="Enter skill list"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSaveSkills}
                    className="bg-black text-white rounded py-2 px-6 hover:bg-gray-800 transition self-center w-32"
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        {/* Languages Section */}
        <div>
          {language.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-64 overflow-y-auto mt-4">
              {language.map((edu: any, index) => (
                <div
                  key={index}
                  className="border border-gray-300 p-4 rounded-md shadow-md h-fit relative"
                >
                  <h4 className="font-bold text-lg mb-1">{edu.languageName}</h4>
                  <p className="text-sm text-gray-600 mb-1">
                    {edu.languageleave}
                  </p>

                  <button
                    onClick={() => handleDeleteLanguage(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <Drawer.Root>
            <h5 className="text-sm font-bold mt-6 mb-2">LANGUAGES</h5>

            <Drawer.Trigger asChild>
              <div className="border-dashed border-2 border-gray-300 p-4 text-center mb-3 w-full">
                <button className="text-black">Add New Item +</button>
              </div>
            </Drawer.Trigger>

            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-white rounded-t-2xl h-fit fixed bottom-0 left-0 right-0 outline-none">
                <div className="p-6 flex flex-col gap-4 w-1/4 mx-auto">
                  <Drawer.Title className="text-xl font-semibold text-center">
                    Your Language Skills
                  </Drawer.Title>
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Language
                      </label>
                      <input
                        type="text"
                        value={languageName}
                        onChange={(e) => setLanguageName(e.target.value)}
                        placeholder="Enter language"
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="w-full">
                      <label className="block text-sm font-medium mb-1">
                        Level
                      </label>

                      <select
                        onChange={(e) => setLanguageleave(e.target.value)}
                        value={languageleave}
                        className="mt-1 w-full p-2 border-2 border-gray-300 rounded outline-none focus:border-blue-500"
                      >
                        <option value="" disabled className="text-gray-600">
                          Select...
                        </option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="fluent">Fluent</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleSaveLanguage}
                    className="bg-black text-white rounded py-2 px-6 hover:bg-gray-800 transition self-center w-32"
                  >
                    Save
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>

        <button
          onClick={fullSave}
          className="bg-black text-white rounded py-2 px-6 hover:bg-gray-800 transition self-center w-50 mx-auto d-block"
        >
          Save
        </button>
      </div>

      <DrawResume />
    </div>
  );
}

export default Dashboard;
