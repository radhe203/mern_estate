import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
function ListingItem({ listing }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          src={listing.imageUrls[0]}
          alt="listing iamge"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="text-green-700 w-4 h-4" />
            <p className=" text-sm text-gray-700 truncate">{listing.address}</p>
          </div>
          <p className="text-sm text-gray-700 line-clamp-2">{listing.description}</p>
          <p className="text-slate-500 font-semibold mt-2">${listing.offer ? listing.discountPrice.toLocaleString('en-us') :listing.regularPrice.toLocaleString('en-us')}
          {listing.type ==='rent' && ' /month'}
          </p>
         <div className="flex gap-4 font-bold text-slate-700 text-xs">
            <div>
            {listing.bedrooms >1 ? `${listing.bedrooms} beds` :'bed'}
            </div>
           <div>
           {listing.bathrooms >1 ? `${listing.bathrooms} baths` :'bath'}
           </div>
         </div>
        </div>
      </Link>
    </div>
  );
}

export default ListingItem;
