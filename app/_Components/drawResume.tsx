"use client";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { LuGithub } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlSocialLinkedin } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Resume {
  userId: string;
  full_name: string;
  email: string;
  mobile_number: string;
  linkedIn: string;
  github: string;
  portfolio: string;
  address: string;
  job_title: string;
  summary: string;
  experiences: string[];
  projects: [];
  educations: string[];
  skills: string[];
  languages: string[];
}

export default function DrawResume() {
  const params = useParams();
  const id = typeof params?.id === "string" ? params.id : "";

  const [resume, setResume] = React.useState<Resume | null>(null);
  const [loading, setLoading] = React.useState(true);
  const supabase = createClient();

  async function getResume() {
    const { data, error } = await supabase
      .from("Resume_Builder")
      .select("*")
      .eq("userId", id);
    if (error) {
      console.log(error);
    } else {
      setResume(data ? data[0] : null);
      setLoading(false);
      console.log(data);
    }
  }

  useEffect(() => {
    getResume();
  }, []);

  if (loading) {
    return (
      <div className="w-[595px] h-[842px] mx-auto p-3 bg-white rounded-md border shadow-lg text-sm text-gray-800 leading-relaxed">
        <Skeleton height={40} width={200} />
        <Skeleton height={30} width={150} className="mt-2" />{" "}
        <div className="flex gap-4 mt-2 text-blue-600 text-sm">
          <Skeleton width={100} />
          <Skeleton width={150} />
          <Skeleton width={200} />
        </div>
        <div className="mt-2">
          <Skeleton count={3} />
        </div>
        <Skeleton count={1} className="mt-2" />
      </div>
    );
  }

  return (
    <div className="w-[595px] h-[842px] mx-auto p-3 bg-white rounded-md border shadow-lg text-sm text-gray-800 leading-relaxed">
      <h1 className="text-3xl font-bold text-black">{resume?.full_name}</h1>
      <h4 className="text-xl font-semibold text-gray-600">
        {resume?.job_title}
      </h4>

      <div className="flex gap-4 mt-1 text-blue-600 text-sm">
        <h6 className="text-black">{resume?.address}</h6>
        <h6 className="flex items-center gap-1 text-blue-700">
          <CiPhone />
          {resume?.mobile_number}
        </h6>
        <h6 className="flex items-center gap-1 text-blue-700">
          <MdOutlineEmail />
          {resume?.email}
        </h6>
      </div>

      <div className="flex gap-4 mt-1 text-sm">
        <a
          className="text-blue-700 flex items-center gap-1 hover:underline"
          href={resume?.linkedIn}
          target="_blank"
          rel="noreferrer"
        >
          <SlSocialLinkedin /> LinkedIn
        </a>
        <a
          className="text-blue-700 flex items-center gap-1 hover:underline"
          href={resume?.github}
          target="_blank"
          rel="noreferrer"
        >
          <LuGithub /> GitHub
        </a>
        <a
          className="text-blue-700 flex items-center gap-1 hover:underline"
          href={resume?.portfolio}
          target="_blank"
          rel="noreferrer"
        >
          <BsGlobe2 /> Website
        </a>
      </div>

      <p className="mt-2 text-justify text-gray-700">{resume?.summary}</p>

      <div>
        <h3 className="text-xl font-bold text-black mb-2">EXPERIENCE</h3>
        {resume?.experiences && Array.isArray(resume.experiences)
          ? resume.experiences.map((itm, index) => {
              const experiences = JSON.parse(itm);
              return (
                <div key={index}>
                  <div className="flex justify-between items-center text-base font-semibold">
                    <h6>{experiences.company}</h6>
                    <p className="text-sm text-gray-500">
                      {experiences.startDate} - {experiences.endDate}
                    </p>
                  </div>
                  <p className="text-sm role">{experiences.role}</p>
                  <p className="text-sm text-gray-600 role1">
                    {experiences.location}
                  </p>
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <h3 className="text-xl font-bold text-black mb-2">PROJECTS</h3>
        {resume?.projects && Array.isArray(resume.projects)
          ? resume.projects.map((itm, index) => {
              const projects = JSON.parse(itm);
              return (
                <div key={index}>
                  <h6 className="font-semibold">{projects.projectName}</h6>
                  <div className="flex gap-2 text-blue-600 text-sm">
                    <a className="hover:underline" href={projects.deployLink}>
                      Live Link
                    </a>
                    /
                    <a className="hover:underline" href={projects.repoLink}>
                      GitHub Link
                    </a>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      <div className="mt-2">
        <h3 className="text-xl font-bold text-black mb-2">EDUCATION</h3>
        {resume?.educations && Array.isArray(resume.educations)
          ? resume.educations.map((itm, index) => {
              const education = JSON.parse(itm);
              return (
                <div key={index}>
                  <div className="flex justify-between items-center text-base font-semibold">
                    <h6>{education.institution}</h6>
                    <p className="text-sm text-gray-500">
                      {education.startDate} - {education.endDate}
                    </p>
                  </div>
                  <div className="flex gap-2 text-sm role">
                    <p>{education.degree}</p>
                    <span>-</span>
                    <p>{education.study}</p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      <div>
        <h3 className="text-xl font-bold text-black mb-1">SKILLS</h3>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="font-semibold text-black">Frontend:</span>
          {resume?.skills && Array.isArray(resume.skills)
            ? resume.skills.map((itm, index) => {
                const skills = JSON.parse(itm);
                return (
                  <div key={index}>
                    <p>{skills.name}</p>
                  </div>
                );
              })
            : ""}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-black mb-2">LANGUAGE</h3>
        {resume?.languages && Array.isArray(resume.languages)
          ? resume.languages.map((itm, index) => {
              const languages = JSON.parse(itm);
              return (
                <div key={index}>
                  <ul className="list-disc text-sm">
                    <li>
                      {languages.languageName} - {languages.languageleave}
                    </li>
                  </ul>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
}
