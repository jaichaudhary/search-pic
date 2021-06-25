import React from "react";

function FinalImages(props) {
  return (
    <div>
      {console.log(props.images)}
      {props.images.map((d) => (
        <img
          key={`${d.id}`}
          src={`https://live.staticflickr.com/${d.server}/${d.id}_${d.secret}.jpg`}
          alt={`${d.title}`}
        ></img>
      ))}
    </div>
  );
}

export default FinalImages;
