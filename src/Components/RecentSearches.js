import React from "react";
import "./RecentSearches.css";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";

function RecentSearches({ arr, onClear = () => {}, setValue = () => {} }) {
  return (
    <div className="recentSearches">
      {arr.length > 0 &&
        arr.map((data, index) => {
          return (
            <div
              className="recentSearches__box"
              key={index}
              onClick={() => {
                setValue(data);
              }}
            >
              <h5 className="recentSearches__content">{data}</h5>
            </div>
          );
        })}
      <div className="recentSearches__clear">
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={onClear}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default RecentSearches;
