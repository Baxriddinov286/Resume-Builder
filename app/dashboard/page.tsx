"use client";
import { createClient } from "@/supabase/client";
import React, { useEffect, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import { Drawer } from "vaul";

interface ResumesType {
  id: string;
  name: string;
}

export default function Page() {
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [resumes, setResumes] = useState<ResumesType[]>([]);

  const supabase = createClient();

  const fetchResumes = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID topilmadi");
      return;
    }

    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("builder_users", userId);
    if (error) {
      toast.error("Ma'lumotlar olinmadi");
      console.error(error.message);
    } else {
      setResumes(data as ResumesType[]);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error("Title bo'sh bo'lmasligi kerak");
      return;
    }

    setLoading(true);
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID topilmadi");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("resumes")
      .insert([{ name: title, builder_users: userId }]); // userId ni saqlash
    setLoading(false);

    if (error) {
      console.error("Error:", error.message);
      toast.error("Xatolik yuz berdi");
    } else {
      toast.success("Rezyume saqlandi!");
      setTitle("");
      fetchResumes();
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div className="max-w-[1520px] mx-auto px-4 py-10">
      <ToastContainer />

      <h1 className="text-3xl font-semibold text-center mb-8">
        Start a New Resume or Choose an Existing One
      </h1>

      <Drawer.Root>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume.id}
              onClick={() => (location.href = `/dashboard/${resume.id}`)}
              className="border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition text-center flex justify-content-center items-center"
            >
              <h2 className="text-sm font-medium text-gray-800">
                {resume.name}
              </h2>
            </div>
          ))}

          <Drawer.Trigger asChild>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 hover:bg-gray-50 transition cursor-pointer">
              <MdOutlineCreateNewFolder className="text-5xl text-blue-500 mb-2" />
              <span className="text-sm font-medium text-gray-600">
                New Resume
              </span>
            </div>
          </Drawer.Trigger>
        </div>

        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className="bg-white rounded-t-2xl h-fit fixed bottom-0 left-0 right-0 outline-none">
            <div className="p-6 flex flex-col justify-content-center items-center gap-4">
              <Drawer.Title className="text-xl font-semibold">
                Create a New Resume
              </Drawer.Title>

              <input
                type="text"
                placeholder="Enter title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-25"
              />

              <button
                onClick={handleSave}
                disabled={loading}
                className="bg-blue-600 text-white rounded py-2 px-6 hover:bg-blue-700 transition disabled:opacity-50 w-25"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
