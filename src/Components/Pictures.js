import React, { useState, useEffect } from "react";

function Pictures() {
  const [Arr, setArr] = useState([]);
  useEffect(() => {
    fetch(
      "https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=aeafe065ace713b9cedb10b958dfa6a3&format=json&nojsoncallback=1&api_sig=891c234ff88565ed46c43c3dc792b94a"
    )
      .then((res) => res.json())
      .then((data) => setArr(data.photos.photo));
  }, []);
  return (
    <div>
      {Arr.map((d) => (
        <img
          key={`${d.id}`}
          src={`https://live.staticflickr.com/${d.server}/${d.id}_${d.secret}.jpg`}
          alt={`${d.title}`}
        ></img>
      ))}
    </div>
  );
}

export default Pictures;
