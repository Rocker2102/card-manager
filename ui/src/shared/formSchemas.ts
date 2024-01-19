import Joi from "joi";

const getMessagesObj = (fieldName = "Field") => {
  return {
    "any.required": `${fieldName} is required`,
    "string.base": `${fieldName} must be a string`,
    "string.empty": `${fieldName} cannot be blank`,
    "string.pattern.base": `${fieldName} is invalid`,
    "string.min": `${fieldName} is too short`,
    "string.max": `${fieldName} is too long`,
    "string.email": "Please enter a valid email address"
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
  syncWithCloud: Joi.boolean().required().messages(getMessagesObj("Sync with cloud")),
  linkCards: Joi.array().items(Joi.string()).optional()
});

export const addUserSchema = Joi.object({
  name: Joi.string().trim().required().min(3).messages(getMessagesObj("Your name")),
  email: Joi.string()
    .trim()
    .empty("")
    .allow("")
    .email({ tlds: { allow: false } })
    .messages(getMessagesObj("Email")),
  mobileNumber: Joi.string()
    .trim()
    .empty("")
    .allow("")
    .pattern(/^[0-9]{10}$/)
    .messages(getMessagesObj("Mobile number")),
  password: Joi.string().trim().required().min(4).messages(getMessagesObj("Password"))
});

export const addCreditCardSchema = Joi.object({
  cardNumber: Joi.string()
    .trim()
    .pattern(/^[0-9]{15,16}$/)
    .required()
    .messages(getMessagesObj("Card number")),
  holdersName: Joi.string().trim().required().min(3).messages(getMessagesObj("Card holder's name")),
  cardNetwork: Joi.string().required().messages(getMessagesObj("Network")),
  cardType: Joi.string().required().messages(getMessagesObj("Card type")),
  expiry: Joi.string()
    .trim()
    .required()
    .pattern(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/)
    .messages(getMessagesObj("Expiry date")),
  cvv: Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{3,4}$/)
    .messages(getMessagesObj("CVV")),
  syncWithCloud: Joi.boolean().required().messages(getMessagesObj("Sync with cloud"))
});
