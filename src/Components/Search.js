import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import "./Search.css";
import ReactPlaceholder from "react-placeholder";
import FinalImages from "./FinalImages";
import Pictures from "./Pictures";
import Auth from "./Auth";
import RecentSearches from "./RecentSearches";
import SearchIcon from "@material-ui/icons/Search";

function Search() {
  const [Tags, setTags] = useState("");
  const [Images, setImages] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const [arr, setArr] = useState([]);
  const [showRecent, setShowRecent] = useState(false);
  const [inputValue, setInputValue] = useState();

  //Callback Function called from ReactSearches.js to clear recent searches and search and set input field to the recent value.
  const onClear = () => {
    setArr([]);
    setShowRecent(false);
  };

  const setInputValueFunc = (data) => {
    setInputValue(data);
    setTags(data);
  };
  // Callback Function END

  useEffect(() => {
    //Limiting the recent search array to 10 values
    if (arr.length > 9) {
      setArr(arr.slice(0, 9));
    }
    //Limiting arrray END

    //If no tags in iput field the hide recent search
    if (Tags.length === 0) {
      setShowRecent(false);
    }
    //END

    const abortController = new AbortController();
    const signal = abortController.signal;
    async function address() {
      const a = await fetch(
        ` https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${Auth.API_KEY}&tags=${Tags}&format=json&nojsoncallback=1`,
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
  }, [Tags, showRecent, arr]);

  return (
    <div>
      <div className="search">
        <h4 className="heading">Search Photos</h4>

        {/* Input Field */}
        <div className="search__input">
          <TextField
            placeholder=" Type to search"
            className="searchBar"
            name="searchBar"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => {
              setIsLoading(true);
              setInputValue(e.target.value);
              setTags(e.target.value);
              if (arr.length > 0) {
                setShowRecent(true);
              }
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                setArr([Tags, ...arr]);
                setShowRecent(false);
              }
            }}
          />
          <SearchIcon
            className="search__Icon"
            onClick={() => {
              setArr([Tags, ...arr]);
              setShowRecent(false);
            }}
          />
        </div>
        {/* Input Field END*/}

        {/* Show Recent Searches */}
        {showRecent && (
          <RecentSearches
            arr={arr}
            onClear={onClear}
            setValue={setInputValueFunc}
          />
        )}
        {/* Show Recent Searches END */}
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
