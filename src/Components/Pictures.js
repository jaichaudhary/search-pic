import React, { useState, useEffect } from "react";
import { GridList } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Auth from "./Auth";

function Pictures() {
  const [Arr, setArr] = useState([]);
  const [Temp, setTemp] = useState([]);
  const [open, setOpen] = useState(false);
  // console.log("Auth", Auth.API_KEY);

  const handleClickOpen = (d) => {
    setTemp(d);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(
      `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=${Auth.API_KEY}&format=json&nojsoncallback=1`,
      { signal: signal }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.stat === "fail") {
          setArr([]);
        } else if (data.stat === "ok") {
          setArr(data.photos.photo);
        }
      })
      .catch((err) => console.log(err));

    return function cleanup() {
      abortController.abort();
    };
  }, []);
  return (
    <div>
      <GridList cols={3} spacing={0}>
        {Arr.map((d) => (
          <img
            onClick={() => {
              handleClickOpen(d);
            }}
            key={`${d.id}`}
            src={`https://live.staticflickr.com/${d.server}/${d.id}_${d.secret}.jpg`}
            alt={`${d.title}`}
          ></img>
        ))}
      </GridList>
      <Dialog onClose={handleClose} open={open}>
        <img
          key={`${Temp.id}`}
          src={`https://live.staticflickr.com/${Temp.server}/${Temp.id}_${Temp.secret}.jpg`}
          alt={`${Temp.title}`}
        ></img>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
}

export default Pictures;
