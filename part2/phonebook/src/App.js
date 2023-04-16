import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
// eslint-disable-next-line import/no-named-as-default
import phonebook from "./phonebook";

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
      if (
        !persons
          .map(person => person.name.toLowerCase())
          .includes(newName.toLowerCase())
      ) {
        setPersons([...persons, { name: newName }]);
        setNewName("");
        setNewNumber("");
      } else {
        alert(`${newName} is already added to phonebook`);
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
