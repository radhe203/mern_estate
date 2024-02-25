import jwt from "jsonwebtoken";
import Listing from '../models/listing.models.js'
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

export async function deleteUser(req, res, next) {
  if (req.user.id !== req.params.id)
  return next(errorHandler(403, "you can delete only your own account"));
  try {
    await User.findByIdAndDelete(req.params.id)
    res.clearCookie('access_token')
    res.status(200).json('user deleted sucessfully')
  } catch (error) {
    next(error)
  }
}


export const deleteListing = async (req,res,next)=>{
  const listings = await Listing.findById(req.params.id)
  if(!listings){
    return next(errorHandler(404,'Listing Not Found'))
  }
  if(req.user.id !== listings.userRef){
    return next(errorHandler(401,'you can delete only your own listing'))
  }
  try {
    await Listing.findByIdAndDelete(req.params.id)
    res.status(200).json('listing has been deleted')
  } catch (error) {
    next(error)
  }

}

export async function getUser(req,res,next){
try {
  const player = await User.findById(req.params.id)
  if(!player) return next(errorHandler(404,'User not found'))
  const {password,...rest} = player._doc
  
  res.status(200).json(rest)
} catch (error) {
  next(error)
}
}