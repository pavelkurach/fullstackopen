import { useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Person from "./Persons.js";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "45657645345" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [filter, setFilter] = useState("");

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handlePersonSubmit = (e) => {
    e.preventDefault();
    if (newName !== "" && newNumber !== "") {
      if (
        !persons
          .map((person) => person.name.toLowerCase())
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
      <Person persons={persons} filter={filter} />
    </div>
  );
};

export default App;
