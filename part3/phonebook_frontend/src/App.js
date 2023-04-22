import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import { Notification, notificationStatus } from "./components/Notification";
// eslint-disable-next-line import/no-named-as-default
import phonebook from "./utils/phonebook";

function App() {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    status: null,
  });

  const showNotification = (message, status) => {
    setNotification({
      message,
      status,
    });
    setTimeout(() => {
      setNotification({
        message: null,
        status: null,
      });
    }, 2000);
  };

  useEffect(() => {
    phonebook
      .getAll()
      .then(data => {
        setPersons(data);
      })
      .catch(error => {
        showNotification(`Could not fetch data`, notificationStatus.SUCCESS);
        console.warn(error);
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
            showNotification(
              `Added ${newName} to the phonebook`,
              notificationStatus.SUCCESS,
            );
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.warn(error);
            showNotification(`Error`, notificationStatus.ERROR);
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
            showNotification(`Updated ${newName}`, notificationStatus.SUCCESS);
            setNewName("");
            setNewNumber("");
          })
          .catch(error => {
            console.warn(error);
            showNotification(`Error`, notificationStatus.ERROR);
          });
      }
    }
  };

  const handleDeleteClicked = id => {
    const personName = persons.find(person => person.id === id).name;
    if (window.confirm(`Delete ${personName}`))
      phonebook
        .deletePerson(id)
        .catch(error => {
          console.warn(error);
          showNotification(
            `Information about ${personName} has already been deleted`,
            notificationStatus.ERROR,
          );
        })
        .finally(() => {
          const newPersons = persons.filter(person => person.id !== id);
          setPersons(newPersons);
        });
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        status={notification.status}
      />
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
