import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import bcrtptjs from "bcryptjs";
import User from "../models/user.models.js";
export function test(req, res) {
  res.json({
    message: "jay shree ram",
  });
}

export async function updateUser(req, res, next) {
  if (req.user.id !== req.params.id)
    return next(errorHandler(403, "you can update only your own account"));

  try {
    if (req.body.password) {
      req.body.password = bcrtptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
}
