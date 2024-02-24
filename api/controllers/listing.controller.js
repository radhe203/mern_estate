import Listing from '../models/listing.models.js'
export async function createListing(req,res,next){
try {
    const listing = await Listing.create(req.body)
    return res.status(201).json(listing)
} catch (error) {
    next(error)
}
}

export const getUserListings = async(req,res,next)=>{
    if (req.params.id === req.user.id) {
      try {
        const listings = await Listing.find({userRef:req.params.id})
        res.status(200).json(listings)
      } catch (error) {
        next(error)
      }
    } else {
      return next(errorHandler(401,'you can view only your listings'))
    }
  }