import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import { getAll, create, deletePerson, updatePerson } from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

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
    if (newName !== "" && newNumber !== "") {
      event.preventDefault();
      let arrayOfNames = persons.map((person) => person.name.toLowerCase());
      if (arrayOfNames.includes(newName.toLocaleLowerCase())) {
        let name = persons.find(
          (person) => person.name.toLowerCase() === newName.toLowerCase()
        );
        let changedName = { ...name, number: newNumber };
        if (
          window.confirm(
            `${newName} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          updatePerson(name.id, changedName)
            .then((returnedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.name.toLowerCase() === name.name.toLowerCase()
                    ? returnedPerson
                    : person
                )
              );
              setNotification(`Updated ${newName}'s number.`, "success");
            })
            .catch(() => {
              setNotification(
                `Information of ${newName} has already been removed from server. Please reload the page.`,
                "error"
              );
            });
        }

        setNewName("");
        setNewNumber("");
        return;
      }

      let nameObject = { name: newName, number: newNumber };
      create(nameObject).then((returnedName) => {
        setPersons(persons.concat(returnedName));
        setNotification(`Added ${newName}`, "success");
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert("Name or number is empty.");
    }
  };

  const deleteName = (id) => {
    let deletedName = persons.find((person) => person.id === id).name;
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name} ?`
      )
    ) {
      deletePerson(id)
        .then(() => {
          let filteredPersons = persons.filter((person) => person.id !== id);

          setPersons(filteredPersons);
          setNotification(`Deleted ${deletedName}`, "error");
        })
        .catch(() => {
          setNotification(
            `Information of ${deletedName} has already been removed from server. Please reload the page.`,
            "error"
          );
        });
    }
  };

  const setNotification = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} type={messageType} />

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

      <Persons persons={persons} deleteName={deleteName} />
    </div>
  );
};

export default App;
