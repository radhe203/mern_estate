import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

function Home() {
  SwiperCore.use([Navigation]);
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sell&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span>
          <br />
          place with ease
        </h1>
        <div className="text-gray-400 text-xs sm:text-sm">
          Radhe Estate is the best place to find your next perfect place to
          live.
          <br />
          We have a wide range of properties for you to choose from.
        </div>
        <Link
          to={"/search"}
          className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
        >
          Let's get started...
        </Link>
      </div>

      {offerListings && offerListings.length > 0 && (
        <Swiper navigation>
          {offerListings.map((listing) => {
            return (
              <SwiperSlide key={listing.imageUrls}>
                <div
                  className="h-[400px]"
                  style={{
                    background: `url(${listing.imageUrls[0]}) no-repeat center`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}

      {offerListings && offerListings.length > 0 && (
        <div className=" max-w-6xl mx-auto p-3 flex gap-8 my-10 flex-col">
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent offers</h2>
              <Link to={`/search?offer=true`} className=" text-slate-600">
                show more offers
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {offerListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        </div>
      )}

      {rentListings && rentListings.length > 0 && (
        <div className=" max-w-6xl mx-auto p-3 flex gap-8 my-10 flex-col">
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent places for rent</h2>
              <Link to={`/search?type=rent`} className=" text-slate-600">
                Show more places for rent
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {rentListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        </div>
      )}

      {saleListings && saleListings.length > 0 && (
        <div className=" max-w-6xl mx-auto p-3 flex gap-8 my-10 flex-col">
          <div className="">
            <div className="my-3">
              <h2 className="text-2xl font-semibold">Recent places for sale</h2>
              <Link to={`/search?type=sale`} className=" text-slate-600">
                Show more places for sale
              </Link>
            </div>
            <div className="flex flex-wrap gap-4">
              {saleListings.map((listing) => {
                return <ListingItem key={listing._id} listing={listing} />;
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
