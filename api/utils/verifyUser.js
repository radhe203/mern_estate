import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export function verifyToken(req,res,next) {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, 'unauthorised 401!'));
  }

  jwt.verify(token, process.env.JWT_SECRET,
    (err, user) => {
      if (err) {
        return next(errorHandler(403, 'Forbidden 403!'));
      }
      req.user = user;
      next();
    })

}
