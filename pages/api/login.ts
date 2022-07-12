import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const { session, error } = await supabase.auth.signIn({
    email,
    password,
  });
  if (error) return res.status(401).json({ msg: error.message });
  res.status(200).json({
    msg: "Logged In successfully",
    access_token: session?.access_token,
  });
}
