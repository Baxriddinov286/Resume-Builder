"use client";
import { createClient } from "@/supabase/client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { BsGlobe2 } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { FaFileDownload } from "react-icons/fa";
import { LuGithub } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { SlSocialLinkedin } from "react-icons/sl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
  projects: string[];
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
  const slidesref = useRef<HTMLDivElement>(null);

  async function getResume() {
    const { data, error } = await supabase
      .from("Resume_Builder")
      .select("*")
      .eq("userId", id);

    if (error) {
      console.error("Error fetching resume:", error);
    } else {
      setResume(data?.[0] || null);
      setLoading(false);
    }
  }

  useEffect(() => {
    getResume();
  }, []);

  const handleGeneratePDF = async () => {
    const input = slidesref.current;
    if (!input) return;

    const canvas = await html2canvas(input, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "pt", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  if (loading) {
    return (
      <div className="w-[595px] h-[842px] mx-auto p-3 bg-white rounded-md border shadow-lg text-sm text-gray-800 leading-relaxed">
        <Skeleton height={40} width={200} />
        <Skeleton height={30} width={150} className="mt-2" />
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
    <div>
      <div
        ref={slidesref}
        style={{
          backgroundColor: "#ffffff",
          color: "#1F2937",
          width: 595,
          height: 842,
          margin: "0 auto",
          borderRadius: 6,
          border: "1px solid #ddd",
          fontSize: 12,
          lineHeight: 1.2,
        }}
        className="text-sm leading-snug p-4 shadow-lg"
      >
        <h1
          style={{ color: "#000000", fontSize: 18, fontWeight: "700" }}
          className="role1"
        >
          {resume?.full_name}
        </h1>
        <h4 style={{ color: "#4B5563", fontSize: 14, fontWeight: "600" }}>
          {resume?.job_title}
        </h4>
        <div
          className="flex flex-wrap gap-2 mt-1"
          style={{ color: "#2563EB", fontSize: 10 }}
        >
          <h6 style={{ color: "#000000" }}>{resume?.address}</h6>
          <h6 className="flex items-center gap-1" style={{ color: "#1D4ED8" }}>
            <CiPhone />
            {resume?.mobile_number}
          </h6>
          <h6 className="flex items-center gap-1" style={{ color: "#1D4ED8" }}>
            <MdOutlineEmail />
            {resume?.email}
          </h6>
        </div>
        <div className="flex flex-wrap gap-2 mt-1" style={{ fontSize: 10 }}>
          <a
            className="flex items-center gap-1 hover:underline"
            href={resume?.linkedIn}
            target="_blank"
            style={{ color: "#1D4ED8" }}
          >
            <SlSocialLinkedin /> LinkedIn
          </a>
          <a
            className="flex items-center gap-1 hover:underline"
            href={resume?.github}
            target="_blank"
            style={{ color: "#1D4ED8" }}
          >
            <LuGithub /> GitHub
          </a>
          <a
            className="flex items-center gap-1 hover:underline"
            href={resume?.portfolio}
            target="_blank"
            style={{ color: "#1D4ED8" }}
          >
            <BsGlobe2 /> Website
          </a>
        </div>
        <p
          className="mt-1 text-justify"
          style={{ color: "#374151", fontSize: 11 }}
        >
          {resume?.summary}
        </p>

        {/* EXPERIENCE */}
        <div className="mt-1">
          <h3
            style={{ color: "#000000", fontSize: 14, fontWeight: "700" }}
            className="role"
          >
            EXPERIENCE
          </h3>
          {resume?.experiences?.map((item, index) => {
            const exp = JSON.parse(item);
            return (
              <div key={index} style={{ marginBottom: 6 }}>
                <div
                  className="flex justify-between font-semibold"
                  style={{ fontSize: 11 }}
                >
                  <h6>{exp.company}</h6>
                  <p style={{ color: "#6B7280" }} className="text-sm">
                    {exp.startDate} - {exp.endDate}
                  </p>
                </div>
                <p className="text-sm" style={{ fontSize: 10, marginTop: -15 }}>
                  {exp.role}
                </p>
                <p style={{ color: "#4B5563", fontSize: 10, marginTop: -10 }}>
                  {exp.location}
                </p>
              </div>
            );
          })}
        </div>
        {/* PROJECTS */}
        <div className="mt-1">
          <h3 style={{ color: "#000000", fontSize: 14, fontWeight: "700" }}>
            PROJECTS
          </h3>
          {resume?.projects?.map((item, index) => {
            const proj = JSON.parse(item);
            return (
              <div key={index} style={{ marginBottom: 6 }}>
                <h6
                  className="font-semibold"
                  style={{ fontSize: 11, marginTop: -10 }}
                >
                  {proj.projectName}
                </h6>
                <div
                  className="flex gap-2 role"
                  style={{ color: "#2563EB", fontSize: 10 }}
                >
                  <a
                    className="hover:underline"
                    href={proj.deployLink}
                    target="_blank"
                  >
                    Live Link
                  </a>
                  /
                  <a
                    className="hover:underline"
                    href={proj.repoLink}
                    target="_blank"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        {/* EDUCATION */}
        <div className="mt-3">
          <h3 style={{ color: "#000000", fontSize: 14, fontWeight: "700" }}>
            EDUCATION
          </h3>
          {resume?.educations?.map((item, index) => {
            const edu = JSON.parse(item);
            return (
              <div key={index} style={{ marginBottom: 6 }}>
                <div
                  className="flex justify-between font-semibold"
                  style={{ fontSize: 11 }}
                >
                  <h6 className="role">{edu.institution}</h6>
                  <p style={{ color: "#6B7280" }}>
                    {edu.startDate} - {edu.endDate}
                  </p>
                </div>
                <p style={{ fontSize: 10, marginTop: -10 }}>
                  {edu.degree} - {edu.study}
                </p>
              </div>
            );
          })}
        </div>
        {/* SKILLS */}
        <div className="mt-1">
          <h3 style={{ color: "#000000", fontSize: 14, fontWeight: "700" }}>
            SKILLS
          </h3>
          <div className="flex flex-wrap gap-1" style={{ fontSize: 10 }}>
            {resume?.skills?.map((item, index) => {
              const skill = JSON.parse(item);
              return (
                <p
                  key={index}
                  style={{
                    backgroundColor: "#E5E7EB",
                    padding: "2px 6px",
                    borderRadius: 4,
                  }}
                >
                  {skill.name}
                </p>
              );
            })}
          </div>
        </div>
        {/* LANGUAGES */}
        <div className="mt-1">
          <h3 style={{ color: "#000000", fontSize: 14, fontWeight: "700" }}>
            LANGUAGES
          </h3>
          <ul className="list-disc pl-4" style={{ fontSize: 10 }}>
            {resume?.languages?.map((item, index) => {
              const lang = JSON.parse(item);
              return (
                <li key={index}>
                  {lang.languageName} - {lang.languageleave}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={handleGeneratePDF}
          style={{ backgroundColor: "#000000", color: "#ffffff" }}
          className="flex items-center gap-2 rounded py-2 px-6 hover:bg-gray-800 transition"
        >
          <FaFileDownload />
          Download PDF
        </button>
      </div>
    </div>
  );
}
