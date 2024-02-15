import user from "../models/user.models.js";
import bcryptjs from "bcryptjs";
export async function signup(req, res) {
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
    res.json({ message: "signup sucessfull" });
  } catch (error) {
    res.status(500).json(error.message);
  }
}
