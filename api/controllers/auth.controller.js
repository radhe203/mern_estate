import user from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export async function signup(req, res,next) {
  const { username, password, email } = req.body;

  if (!username || !password || !email || username === "") {
    return res.status(400).json({ message: "all feilds are required" });
  }

  const hasedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new user({
    username,
    password: hasedPassword,
    email,
  });

  try {
    await newUser.save();
    res.json({ message: "user created sucessfully" });
  } catch (error) {
    next(error)
  }
}
