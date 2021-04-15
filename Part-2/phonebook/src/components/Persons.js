import React from "react";
import SinglePerson from "./SinglePerson";

function Persons({ persons }) {
  return (
    <div>
      {persons.map((person) => (
        <SinglePerson key={person.id} person={person} />
      ))}
    </div>
  );
}

export default Persons;
