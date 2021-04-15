import React from "react";

function SinglePerson({ person }) {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
}

export default SinglePerson;
