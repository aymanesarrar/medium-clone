import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import cookies from "next-cookies";
import { UserLayout } from "../../components/layouts/UserLayout";
import { supabase } from "../../utils/supabaseClient";

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

export default function Profile({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <UserLayout user={user}>
      <h1>test</h1>
    </UserLayout>
  );
}
