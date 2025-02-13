import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import Joi from "joi";

const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

// Plugin for authentication
userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

// Joi Validation Schema
export const validateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

export default User;
