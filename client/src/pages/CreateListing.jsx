import React from "react";

function CreateListing() {
  return (
    <main className=" p-3 max-w-4xl mx-auto">
      <h1 className=" text-center text-2xl font-bold my-7">Create a listing</h1>

      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1 mb-3">
          <input
            type="text"
            placeholder="Name"
            className=" border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            required
            id="name"
          />

          <textarea
            placeholder="Description"
            className=" border p-3 rounded-lg"
            required
            id="discription"
          />

          <input
            type="text"
            placeholder="Address"
            className=" border p-3 rounded-lg"
            required
            id="Address"
          />

          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input type="checkbox" id="Offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bed"
                required
                defaultValue={1}
                className="p-3 border border-gray-300 rounded-lg w-20"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="10"
                id="bathrooms"
                required
                defaultValue={1}
                className="p-3 border border-gray-300 rounded-lg w-20"
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
              />
              <div className="">
                <p>Regular Price</p>
                <span className=" text-xs">($/month)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountPrice"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
              />
             <div className="">
                <p>Discounted Price</p>
                <span className=" text-xs">($/month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
            <p className=" font-semibold">
               images: <span className=" font-normal text-gray-600 ml-2">The first image will be cover pgoto (max:6)</span>
            </p>
            <div className="flex gap-2">
                <input className="border border-gray-300 rounded w-full p-3" type="file" accept="image/*" multiple id="images"/>
                <button type="button" className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 font-medium">Upload</button>
            </div>
            <button className=" bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80 mt-2">Create listing</button>
        </div>
        
      </form>
    </main>
  );
}

export default CreateListing;
