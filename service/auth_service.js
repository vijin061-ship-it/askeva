import jwt from "jsonwebtoken";
import { compare_password } from "../utils/hash.js";
import { find_user_by_email } from "../models/auth_modal.js";

export const login_service = async ({ email, password }) => {

  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  const user = await find_user_by_email(email);

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  const isMatch = await compare_password(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  return {
    success: true,
    message: "Login Successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};



