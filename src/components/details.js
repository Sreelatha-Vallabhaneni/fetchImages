import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "./spinner";

function Details() {
  const [details, setDetails] = useState([]);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const id = location.state.id;

  useEffect(() => {
    (async () => {
      setTimeout(() => setLoading(false), 500);
      try {
        const url = `https://jsonplaceholder.typicode.com/photos?id=${id}`;
        const res = await axios.get(url);
        const getData = await res.data;
        setDetails(getData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="spinner flex">
          <Spinner />
        </div>
      ) : (
        <div style={{ padding: "10px" }} className="details-image">
          <a href="/" className="back">
            <h5>Back</h5>
          </a>
          {details.map((item) => (
            <img key={item.id} src={item.url} alt="colorImage" className="img-url" />
          ))}
        </div>
      )}
    </div>
  );
}

export default Details;
