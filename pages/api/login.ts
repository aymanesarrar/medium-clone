import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function loginHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const { data: session, error } = await supabase.auth.api.signInWithEmail(
    email,
    password
  );
  if (error) return res.status(401).json({ msg: error.message });
  res.status(200).json({
    msg: "Logged In successfully",
    access_token: session?.access_token,
  });
}
