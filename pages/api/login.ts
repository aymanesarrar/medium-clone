import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  console.log(user, session, error);
  res.status(200).send("logged in");
}
