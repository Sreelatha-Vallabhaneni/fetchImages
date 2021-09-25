import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import Details from "./details";
import Spinner from "./spinner";

function List() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTimeout(() => setLoading(false), 500);
      try {
        const url = `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=9`;
        const res = await axios.get(url);
        const getData = await res.data;
        setData(getData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [page]);

  return (
    <div>
      {loading ? (
        <div className="spinner flex">
          <Spinner />
        </div>
      ) : (
        <Router>
          <Route exact path="/">
            <Pagination count={42} onChange={(e, value) => setPage(value)} />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                flexWrap: "wrap",
                alignItems: "center",
              }}
              className="list"
            >
              {data.map((list) => (
                <Link
                  to={{
                    pathname: `/photos/${list.id}`,
                    state: { id: list.id },
                  }}
                  key={list.id}
                >
                  <img
                    src={list.thumbnailUrl}
                    className="list-image"
                    alt="colorImage"
                  />
                </Link>
              ))}
            </Box>
          </Route>
          <Route path="/photos/:id" component={Details} />
        </Router>
      )}
    </div>
  );
}

export default List;
