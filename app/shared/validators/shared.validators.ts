import { Joi } from "@koa-better-modules/joi-router";

export const idOptional = Joi.string().uuid();
export const idRequired = idOptional.required();

export const numberRequired = Joi.number().required();
export const stringRequired = Joi.string().required();
export const stringOptional = Joi.string().optional();

export const errorValidators = Joi.object({
  code: Joi.number().required(),
  message: Joi.number().required(),
});
