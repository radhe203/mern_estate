import Listing from "../models/listing.models.js";
import { errorHandler } from "../utils/error.js";
export async function createListing(req, res, next) {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
}

export const getUserListings = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "you can view only your listings"));
  }
};

export const updateListing = async (req, res, next) => {
  const listings = await Listing.findById(req.params.id);
  if (!listings) {
    return next(errorHandler(404, "Listing Not Found"));
  }
  if (req.user.id !== listings.userRef) {
    return next(errorHandler(401, "you can delete only your own listing"));
  }

  try {
    const updatedLisdting = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedLisdting)
  } catch (error) {
    next(error)
  }
};
