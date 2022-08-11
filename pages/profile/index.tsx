import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import { UserLayout } from "../../components/layouts/UserLayout";
import { supabase } from "../../utils/supabaseClient";
import { AiOutlineUser } from "react-icons/ai";
import { ProfileData } from "../../types/interfaces/utils";

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [data, setData] = useState<ProfileData | undefined>(undefined);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select(
            "firstname, lastname, username, website, avatar_url, updated_at"
          )
          .eq("id", user.id)
          .single();
        if (error && status !== 406) throw error;
        if (data) {
          setData(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [user.id]);
  return (
    <UserLayout user={user}>
      <div className="flex flex-col items-center justify-center w-screen gap-10">
        <AiOutlineUser />
        <div>first name: {data && data.firstname}</div>
        <div>last name: {data && data.lastname}</div>
        <div>username: {data && data.username}</div>
        <div>website: {data && data.website}</div>
        <div>last update: {data && data.updated_at}</div>
      </div>
    </UserLayout>
  );
}

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
      return {
        props: { user },
      };
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
