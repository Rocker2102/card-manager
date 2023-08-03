import Joi from "joi";

const getMessagesObj = (fieldName = "Field") => {
  return {
    "any.required": `${fieldName} is required`,
    "string.base": `${fieldName} must be a string`,
    "string.empty": `${fieldName} cannot be blank`,
    "string.pattern.base": `${fieldName} is invalid`,
    "string.min": `${fieldName} is too short`,
    "string.max": `${fieldName} is too long`
  };
};

export const addBankAccountSchema = Joi.object({
  bankName: Joi.string().required().messages(getMessagesObj("Bank name")),
  accountNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{9,18}$/)
    .required()
    .messages(getMessagesObj("Account number")),
  accountHoldersName: Joi.string()
    .trim()
    .required()
    .min(3)
    .messages(getMessagesObj("Account holder's name")),
  ifscCode: Joi.string()
    .trim()
    .empty("")
    .allow("")
    .pattern(/[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/)
    .messages(getMessagesObj("IFSC code")),
  mmid: Joi.string()
    .trim()
    .empty("")
    .allow("")
    .pattern(/^[0-9]{7}$/)
    .messages(getMessagesObj("MMID")),
  nomineesName: Joi.string()
    .trim()
    .empty("")
    .allow("")
    .min(3)
    .messages(getMessagesObj("Nominee's name")),
  syncWithCloud: Joi.boolean().required().messages(getMessagesObj("Sync with cloud"))
});
