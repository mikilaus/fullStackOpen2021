import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

import { getAll, create } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    console.log(persons);
    let filteredArray = persons.filter((person) =>
      person.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setPersons(filteredArray);
  };

  const addName = (event) => {
    event.preventDefault();
    let arrayOfNames = persons.map((person) => person.name);
    if (arrayOfNames.includes(newName)) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      setNewNumber("");
      return;
    }

    let nameObject = { name: newName, number: newNumber };
    create(nameObject).then((returnedName) => {
      setPersons(persons.concat(returnedName));
      setNewName("");
      setNewNumber("");
    });
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFunction={handleSearchChange} value={searchValue} />

      <h2>add a new</h2>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addName={addName}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>

      <Persons persons={persons} />
    </div>
  );
};

export default App;
