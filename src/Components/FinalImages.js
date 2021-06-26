import React, { useState } from "react";
import { GridList } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import Button from "@material-ui/core/Button";

function FinalImages(props) {
  const [IsOpen, setIsOpen] = useState(false);
  const [Tempo, setTempo] = useState([]);
  const handleClickOpen = (d) => {
    setTempo(d);
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {console.log(props.images)}
      <GridList cols={3} spacing={0}>
        {props.images.map((d) => (
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
      <Dialog onClose={handleClose} open={IsOpen}>
        <img
          key={`${Tempo.id}`}
          src={`https://live.staticflickr.com/${Tempo.server}/${Tempo.id}_${Tempo.secret}.jpg`}
          alt={`${Tempo.title}`}
        ></img>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
}

export default FinalImages;
