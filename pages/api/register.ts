import { NextApiRequest, NextApiResponse } from "next";
import { authenticationShema } from "../../schema/joi";
import { supabase } from "../../utils/supabaseClient";
import { User } from "@supabase/supabase-js";
import { ApiError } from "next/dist/server/api-utils";
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;
  const { error } = authenticationShema.validate(req.body);
  if (error) {
    return res.json({ status: "error", error: error.message });
  }
  try {
    const { data: user, error } = <
      { data: User | null; error: ApiError | null }
    >await supabase.auth.api.signUpWithEmail(email, password);
    if (error) {
      return res.json({ status: error.statusCode, msg: error.message });
    }
    if (user && user.identities?.length === 0)
      return res.status(409).json({ msg: "User already exists" });
    else return res.status(200).json({ msg: "user created successfully" });
  } catch (error) {
    console.log(error);
  }
  res.status(200).send("ok");
}
