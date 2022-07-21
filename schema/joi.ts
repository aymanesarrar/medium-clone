import Joi from "joi";
import { join } from "path/posix";

export const authenticationShema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("[a-zA-Z0-9@ #_-]{8,256}$")),
});

export const profileSchema = Joi.object({
  firstname: Joi.string().regex(new RegExp("[a-z]")),
  lastname: Joi.string().regex(new RegExp("[a-z]")),
  username: Joi.string().alphanum(),
  website: Joi.string().regex(
    new RegExp(
      "^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?"
    )
  ),
});
