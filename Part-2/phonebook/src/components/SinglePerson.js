import React from "react";

function SinglePerson({ person }) {
  return (
    <p key={person.name}>
      {person.name} {person.number}
    </p>
  );
}

export default SinglePerson;
