import React from "react";

function SinglePerson({ person, deleteName }) {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => deleteName(person.id)}>delete</button>
    </p>
  );
}

export default SinglePerson;
