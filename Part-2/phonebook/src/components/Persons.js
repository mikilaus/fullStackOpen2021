import React from "react";
import SinglePerson from "./SinglePerson";

function Persons({ persons, deleteName }) {
  return (
    <div>
      {persons.map((person) => (
        <SinglePerson key={person.id} person={person} deleteName={deleteName} />
      ))}
    </div>
  );
}

export default Persons;
