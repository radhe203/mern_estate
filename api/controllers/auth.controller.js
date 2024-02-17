import user from "../models/user.models.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
export async function signup(req, res, next) {
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
    next(error);
  }
}

export async function signin(req, res, next) {
  const { password, email } = req.body;

  try {
    const validuser = await user.findOne({ email });
    if (!validuser) {
      return next(errorHandler(404, "user not found"));
    }

    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorHandler(404, "Wrong Credentials !"));
    }
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validuser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
}
