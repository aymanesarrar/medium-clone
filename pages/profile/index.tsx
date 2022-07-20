import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { useEffect } from "react";
import { UserLayout } from "../../components/layouts/UserLayout";
import { supabase } from "../../utils/supabaseClient";

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data, error, status } = await supabase
          .from("profiles")
          .select("username, website, avatar_url")
          .eq("id", user.id)
          .single();
        if (error && status !== 406) throw error;
        if (data) console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfile();
  }, [user.id]);
  return (
    <UserLayout user={user}>
      <h1>test</h1>
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
