import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "./Search.css";
import ReactPlaceholder from "react-placeholder";
import FinalImages from "./FinalImages";
import Pictures from "./Pictures";

function Search() {
  const [Tags, setTags] = useState("");
  const [Images, setImages] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(Tags);
    const abortController = new AbortController();
    const signal = abortController.signal;
    async function address() {
      const a = await fetch(
        ` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=1599b5d9c1683251cff2f8ea545cf102&tags=${Tags}&format=json&nojsoncallback=1`,
        { signal: signal }
      );
      setIsLoading(false);

      const b = a.json();
      return b;
    }
    address()
      .then((res) => {
        // console.log(res);
        if (res.stat === "fail") {
          setImages([]);
        } else if (res.stat === "ok") {
          setImages(res.photos.photo);
        }
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      abortController.abort();
    };
  }, [Tags]);

  return (
    <div>
      <div className="search">
        <TextField
          placeholder=" Wanna Search!!"
          className="searchBar"
          name="searchBar"
          onChange={(e) => {
            setIsLoading(true);
            setTags(e.target.value);
          }}
        />
      </div>
      <div className="items">
        <ReactPlaceholder type="media" rows={20} ready={IsLoading === false}>
          {Images.length > 0 ? <FinalImages images={Images} /> : <Pictures />}
        </ReactPlaceholder>
      </div>
    </div>
  );
}

export default Search;
