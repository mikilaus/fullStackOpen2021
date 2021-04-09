import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "465456564" },
    { name: "Ada Lovelance", number: "465456564" },
    { name: "Dan Abramov", number: "465456564" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

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
    setPersons(persons.concat(nameObject));
    setNewName("");
    setNewNumber("");
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
