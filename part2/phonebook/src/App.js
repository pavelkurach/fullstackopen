import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
// eslint-disable-next-line import/no-named-as-default
import phonebook from "./utils/phonebook";

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebook.getAll().then(data => {
      setPersons(data);
    });
  }, []);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleNumberChange = e => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const handlePersonSubmit = e => {
    e.preventDefault();
    if (newName !== "" && newNumber !== "") {
      const existingPerson = persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase(),
      );
      if (!existingPerson) {
        phonebook
          .addPerson({
            name: newName,
            number: newNumber,
          })
          .then(newPerson => {
            setPersons([...persons, newPerson]);
            setNewName("");
            setNewNumber("");
          });
      } else if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with the new one?`,
        )
      ) {
        phonebook
          .updateNumber({
            id: existingPerson.id,
            name: newName,
            number: newNumber,
          })
          .then(updatedPerson => {
            setPersons(
              persons.map(person =>
                person.id === updatedPerson.id ? updatedPerson : person,
              ),
            );
            setNewName("");
            setNewNumber("");
          });
      }
    }
  };

  const handleDeleteClicked = id => {
    if (
      window.confirm(`Delete ${persons.find(person => person.id === id).name}`)
    )
      phonebook.deletePerson(id).then(response => {
        if (response) {
          const newPersons = persons.filter(person => person.id !== id);
          setPersons(newPersons);
        }
      });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <br />
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handlePersonSubmit={handlePersonSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        handleDeleteClicked={handleDeleteClicked}
      />
    </div>
  );
}

export default App;
