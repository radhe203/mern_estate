import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
function Contact({ listing }) {
  const [landlord, setLandlord] = useState(null);
  const [Message, setMessage] = useState("");
  function handelChange(e) {
    setMessage(e.target.value);
  }
  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setLandlord(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  });
  return (
    <>
      {landlord && (
        <div>
          cnntact : <span className="font-semibold">{landlord.username}</span>
          <span>{` for `}</span>
          <span className="font-semibold">
            {listing.name.toLowerCase()}
          </span>
          <textarea
          className="w-full border p-3 rounded-lg my-2"
            name="message"
            id="message"
            rows="2"
            onChange={handelChange}
          ></textarea>
          <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${Message}`} className=" bg-slate-700 w-full block text-center text-white p-2 rounded-lg uppercase">
            Send message
          </Link>
        </div>
      )}
    </>
  );
}

export default Contact;
