import React from "react";

function Filter({ handleFunction, value }) {
  return (
    <div>
      filter shown with <input onChange={handleFunction} value={value} />
    </div>
  );
}

export default Filter;
