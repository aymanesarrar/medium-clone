import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { useEffect, useState } from "react";
import { UserLayout } from "../../components/layouts/UserLayout";
import { supabase, supabaseUrl } from "../../utils/supabaseClient";
import { ProfileData } from "../../types/interfaces/utils";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";

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
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [user.id]);
  return (
    <UserLayout user={user}>
      <div className="flex-1 w-screen p-4 mx-auto">
        {data ? (
          <div className="flex justify-between mx-auto max-w-7xl md:max-w-6xl">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.avatar_url}`}
              alt=""
              height={200}
              width={200}
              className="max-w-full rounded-full"
            />
            <div className="flex flex-col gap-4 p-4 border-t-2 border-b-2 shadow-xl pr-28 rounded-xl border-t-black border-b-black">
              <p className="font-semibold">
                full name : {data?.firstname} {data?.lastname}
              </p>
              <p className="font-semibold">username: {data?.username}</p>
              <p className="font-semibold">website: {data?.website}</p>
              <p className="font-semibold">last updated : {data?.updated_at}</p>
            </div>
          </div>
        ) : (
          <ImSpinner2 className="animate-spin" />
        )}
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
