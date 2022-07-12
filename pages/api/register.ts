import { NextApiRequest, NextApiResponse } from "next";
import Joi from "joi";
import { authenticationShema } from "../../schema/joi";
import { supabase } from "../../utils/supabaseClient";
import { UserCredentials } from "@supabase/gotrue-js";
export default async function registerHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password }: UserCredentials = req.body;
  const { error } = authenticationShema.validate(req.body);
  if (error) {
    return res.json({ status: "error", error: error.message });
  }
  try {
    const {
      user,
      session,
      error: err,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!session && user?.identities?.length !== 0)
      return res.json({
        status: "ok",
        message: "a user has been created, please confirm your email",
      });
    else
      return res.json({
        status: "ok",
        message: "a user with this email already created",
      });
  } catch (error) {
    return res.send("an error has occured");
  }
  res.status(200).send("ok");
}
