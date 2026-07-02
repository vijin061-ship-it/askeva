import bcrypt from "bcrypt";

export const hash_password = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const compare_password = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
