
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
function UpdateListing() {
  const { currentuser } = useSelector((state) => {
    return state.user.user;
  });
  const params = useParams()
  const navigate = useNavigate();
  const [files, setFile] = useState([]);
  const [imageUpladError, SetImageUpladError] = useState(false);
  const [uploading, Setuploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, SetFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 0,
    discountPrice: 0,
    bathrooms: 1,
    bedrooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
  });

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.id;
      const res = await fetch(`/api/listing/get/${listingId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      console.log(data)
    SetFormData(data);
    };

    fetchListing();
  }, []);


  function handleSumbmitIamage() {
    if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
      const promises = [];
      Setuploading(true);
      SetImageUpladError(false);
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((url) => {
          SetFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(url),
          });
          SetImageUpladError(false);
          Setuploading(false);
        })
        .catch((error) => {
          SetImageUpladError("Image Upload failed (2 mb max per Image)");
        });
    } else {
      SetImageUpladError("you can uplad only 6 image per listing");
    }
  }

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const filename = new Date().getTime() + file.name;
      const storageRef = ref(storage, filename);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handelRemoveImage = (index) => {
    SetFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  function handelChange(e) {
    if (e.target.id === "sell" || e.target.id === "rent") {
      SetFormData({
        ...formData,
        type: e.target.id,
      });
    } else if (e.target.id === "parking") {
      SetFormData({
        ...formData,
        parking: !formData.parking,
      });
    } else if (e.target.id === "offer") {
      SetFormData({
        ...formData,
        offer: !formData.offer,
      });
    } else if (e.target.id === "furnished") {
      SetFormData({
        ...formData,
        furnished: !formData.offer,
      });
    } else {
      SetFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  }

  async function submitHandel(e) {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1) {
        return setError("You must upload at least one image");
      }

      if (+formData.regularPrice < +formData.discountPrice) {
        return setError("Discount price must be lower than regular price");
      }
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/listing/update/${params.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentuser._id,
        }),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);

      if (data.success === false) {
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }



  return (
    <main className=" p-3 max-w-4xl mx-auto">
      <h1 className=" text-center text-2xl font-bold my-7">Update a listing</h1>

      <form className="flex flex-col sm:flex-row gap-4" onSubmit={submitHandel}>
        <div className="flex flex-col gap-4 flex-1 mb-3">
          <input
            type="text"
            placeholder="Name"
            className=" border p-3 rounded-lg"
            maxLength={62}
            minLength={10}
            required
            id="name"
            onChange={handelChange}
            defaultValue={formData.name}
          />

          <textarea
            placeholder="Description"
            className=" border p-3 rounded-lg"
            required
            id="description"
            onChange={handelChange}
            defaultValue={formData.description}
          />

          <input
            type="text"
            placeholder="Address"
            className=" border p-3 rounded-lg"
            required
            id="address"
            onChange={handelChange}
            defaultValue={formData.address}

          />

          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handelChange}
                id="sell"
                className="w-5"
                checked={formData.type === "sell"}
              />
              <span>Sell</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handelChange}
                checked={formData.type === "rent"}
              />
              <span>Rent</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handelChange}
                defaultChecked={formData.parking}
              />
              <span>Parking Spot</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handelChange}
                defaultChecked={formData.furnished}
              />
              <span>Furnished</span>
            </div>

            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handelChange}
                defaultChecked={formData.offer}
              />
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
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={handelChange}
                defaultValue={formData.bedrooms}
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
                defaultValue={formData.bathrooms}
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={handelChange}
              />
              <p>Baths</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                required
                className="p-3 border border-gray-300 rounded-lg w-20"
                onChange={handelChange}
                defaultValue={formData.regularPrice}
              />
              <div className="">
                <p>Regular Price</p>
                <span className=" text-xs">($/month)</span>
              </div>
            </div>
            {formData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  required
                  className="p-3 border border-gray-300 rounded-lg w-20"
                  onChange={handelChange}
                defaultValue={formData.discountPrice}

                />
                <div className="">
                  <p>Discounted Price</p>
                  <span className=" text-xs">($/month)</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className=" font-semibold">
            images:{" "}
            <span className=" font-normal text-gray-600 ml-2">
              The first image will be cover pgoto (max:6)
            </span>
          </p>
          <div className="flex gap-2">
            <input
              className="border border-gray-300 rounded w-full p-3"
              type="file"
              onChange={(e) => setFile(e.target.files)}
              accept="image/*"
              multiple
              id="images"
            />
            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-80 font-medium"
              onClick={handleSumbmitIamage}
            >
              {uploading ? "Uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-sm">
            {imageUpladError && imageUpladError}
          </p>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => {
              return (
                <div className="flex justify-between  items-center" key={index}>
                  <img
                    src={url}
                    alt="listing image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handelRemoveImage(index)}
                    className="uppercase text-red-700 hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          <button
            className=" bg-slate-700 text-white p-3 uppercase rounded-lg hover:opacity-95 disabled:opacity-80 mt-2"
            disabled={uploading || loading}
            type="submit"
          >
            {loading ? "Updating..." : "Update listing"}
          </button>
          {error && <p className="text-red-700 text-sm">{error}</p>}
        </div>
      </form>
    </main>
  );
}

export default UpdateListing












// import React from 'react'

// function UpdateListing() {
//   return (
//     <div>UpdateListing</div>
//   )
// }

// export default UpdateListing