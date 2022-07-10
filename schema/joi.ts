import Joi from "joi";

export const authenticationShema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().pattern(new RegExp("[a-zA-Z0-9@ #_-]{8,256}$")),
});
