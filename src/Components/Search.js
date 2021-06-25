import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Pictures from "./Pictures";
import FinalImages from "./FinalImages";
import "./Search.css";

function Search() {
  const [Tags, setTags] = useState("");
  const [Images, setImages] = useState([]);

  useEffect(() => {
    console.log(Tags);
    async function address() {
      const a = await fetch(
        ` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=aeafe065ace713b9cedb10b958dfa6a3&tags=${Tags}&format=json&nojsoncallback=1`
      );

      const b = a.json();
      return b;
    }
    address().then((res) => {
      // console.log(res);
      res.photos.photo == null ? setImages([]) : setImages(res.photos.photo);
    });
  }, [Tags]);

  return (
    <div>
      <div className="search">
        <TextField
          className="searchBar"
          name="searchBar"
          onChange={(e) => {
            setTags(e.target.value);
          }}
        />
        <br />
      </div>
      <div>
        {Images.length > 0 ? <FinalImages images={Images} /> : <Pictures />}
      </div>
    </div>
  );
}

export default Search;
