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
    res.status(200).json(updatedLisdting);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listings = await Listing.findById(req.params.id);
    if (!listings) {
      return errorHandler(404, "Listing not Found");
    }
    res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};

export const getListings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;
    let parking = req.query.parking;
    let type = req.query.type;
    let furnished = req.query.furnished;

    if (offer === undefined || offer === "false") {
      offer = { $in: [true, false] };
    }

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [true, false] };
    }
    if (parking === undefined || parking === "false") {
      parking = { $in: [true, false] };
    }

    if (type === undefined || type === "all") {
      type = { $in: ['sell','rent'] };
    }

    const searchTerm = req.query.searchTerm || "";
    console.log(searchTerm)
    const sort = req.query.short || "createdAt";
    const order = req.query.order || "desc";


    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    }).sort({
        [sort]: order,
      })
      .limit(limit)
      .skip(startIndex);

      return res.status(200).json(listings)
  } catch (error) {
    next(error);
  }

};
