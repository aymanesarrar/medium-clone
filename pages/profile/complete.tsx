import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { UserLayout } from "../../components/layouts/UserLayout";
import { supabase } from "../../utils/supabaseClient";
import { FaUserCircle } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { motion } from "framer-motion";
import { ProfileInputs } from "../../types/interfaces/utils";
import { profileSchema } from "../../schema/joi";
import React, { useState } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = cookies(context);
  if (typeof cookie["x-access-token"] !== "undefined") {
    const { user } = await supabase.auth.api.getUser(cookie["x-access-token"]);
    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
        props: {},
      };
    } else {
      const { data } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", user.id);
      if (data?.length !== 0) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
          props: {},
        };
      } else {
        return {
          props: { user },
        };
      }
    }
  } else
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
      props: {},
    };
};

export default function Complete({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [path, setPath] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit } = useForm<ProfileInputs>();
  const onSubmit: SubmitHandler<ProfileInputs> = async (data) => {
    const { error } = profileSchema.validate(data);
    if (!error) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) throw error;
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("error downloading image");
      }
      data.avatar_url = avatarUrl;
      console.log(data);
      const result = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify(data),
      });
      let res = await result.json();
    } else console.log(error);
  };
  const uploadAvatar = async (event: React.FormEvent) => {
    try {
      setUploading(true);
      const target = event.target as HTMLInputElement;
      if (!target.files || target.files.length === 0) {
        throw new Error("You must select an image to upload");
      }
      const file = target.files[0];
      const fileExt = file.name.split(".").pop();
      const filename = `${Math.random()}.${fileExt}`;
      const filePath = `${filename}`;
      setPath(filePath);
      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);
      if (uploadError) {
        throw uploadError;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <UserLayout user={user}>
      <main className="flex flex-col items-center justify-center w-screen p-10">
        <FaUserCircle className="h-12 w-9" />
        <motion.form
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5 }}
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-2 outline-none md:w-1/2"
        >
          <label htmlFor="firstname">firstname : </label>
          <input
            {...register("firstname")}
            type="text"
            className="border-b-black border-b-[1px] outline-none p-2"
          />
          <label htmlFor="firstname">lastname : </label>
          <input
            {...register("lastname")}
            type="text"
            className="border-b-black border-b-[1px] outline-none p-2"
          />
          <label htmlFor="firstname">username : </label>
          <input
            {...register("username")}
            type="text"
            className="border-b-black border-b-[1px] outline-none p-2"
          />
          <label htmlFor="firstname">website : </label>
          <input
            {...register("website")}
            type="text"
            className="border-b-black border-b-[1px] outline-none p-2"
          />
          <input
            type="file"
            id="single"
            accept="image/*"
            onChange={uploadAvatar}
            disabled={uploading}
          />
          <button className="p-2 mt-4 text-white bg-black rounded-full">
            Complete Profile
          </button>
        </motion.form>
      </main>
    </UserLayout>
  );
}
