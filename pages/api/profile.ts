import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabaseClient";

export default async function ProfileHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstname, lastname, username, avatar_url, website } = req.body;
  if (typeof req.cookies["x-access-token"] !== "undefined") {
    const { user, error } = await supabase.auth.api.getUser(
      req.cookies["x-access-token"] as string
    );
    if (error) res.send(error);
    else {
      const { error: err } = await supabase.from("profiles").insert(
        {
          id: user?.id,
          firstname,
          lastname,
          username,
          website,
          avatar_url,
          completed: true,
          updated_at: new Date().toDateString(),
        },

        { returning: "minimal" }
      );
      if (!err) {
        res.status(200).json({ msg: "created" });
      } else res.json({ msg: err });
    }
  }
}
