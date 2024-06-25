import { useEffect, useState } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [contactsToShow, setContactsToShow] = useState([]);
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then((response) => {
      setPersons(response);
      setContactsToShow(response);
    });
    console.log("personService.getAll called");
  }, []);

  useEffect(() => {
    setContactsToShow(persons);
  }, [persons]);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const showNotification = (message) => {
    console.log(message)
    setMessage(message);
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPersonObj = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find(person => person.name === newName);
    const existingPersonId = existingPerson ? existingPerson.id : null;

    if (!newName || !newNumber) {
      alert("no number or name was given");
    }
    else if (existingPerson) {
      console.log("updating person with id: ", existingPersonId);

      if (window.confirm(`Do you want to change ${newName}'s number to ${newNumber}`)) {
        console.log("confirmed");
        personService
          .update(existingPersonId, newPersonObj)
          .then(response => {
            console.log(response)
            setPersons((prevPersons) => {
              const updatedPersonsArray = prevPersons.map(person =>
                person.id === existingPersonId ? response : person
              )
              return updatedPersonsArray
            });
            showNotification(`Changed ${newName}'s number to ${newNumber}`)
          })
          .catch(error => {
            showNotification(error.response.data.error)
            console.log("error updating number", error.message)
          })

      }
    }
    else if (!existingPerson) {
      personService
        .create(newPersonObj)
        .then((response) => {
          console.log(response)
          setPersons((prevPersons) => prevPersons.concat(response));
          showNotification(`added: ${response.name} ${response.number}`);
        })
        .catch(error => {
          showNotification(error.response.data.error);
        })

      setNewName("");
      setNewNumber("");
      console.log(persons);
    }
    else {
      alert(`${newName} is already saved`);
    }
  };

  const deletePerson = (person) => {
    if (window.confirm(`Do you really want to delete ${person.name}`)) {
      personService
        .deletePersonById(person.id)
        .then((response) => {
          showNotification(`deleted: ${response.name} ${response.number}`)
          setPersons((persons) => persons.filter((p) => p.id !== response.id));
        })
        .catch((error) => {
          console.error("error deleting person", error);
          showNotification(`${person.name}'s information has already been deleted from the server`)
        });
    }
  };

  const searchPerson = (event) => {
    event.preventDefault();
    if (search === "") {
      setContactsToShow(persons);
    } else {
      setContactsToShow(
        persons.filter(
          (person) =>
            person.name.toUpperCase().includes(search.toUpperCase()) ||
            person.number.includes(search)
        )
      );
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>

      <h2>Filter contacts</h2>
      <Filter
        searchPerson={searchPerson}
        search={search}
        handleSearchChange={handleSearchChange}
      />

      <h2>Submit new contact</h2>
      <AddContact
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Notification
        message={message}
      />
      <div>
        {contactsToShow.map((person) => (
          <NumberLine
            person={person}
            key={person.id}
            deletePerson={deletePerson}
          />
        ))}
      </div>
    </div>
  );
};

// COMPONENTS

const AddContact = ({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <>
      <form onSubmit={addPerson}>
        <div>
          <div>
            Name:
            <input
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            Number:
            <input
              value={newNumber}
              onChange={handleNumberChange}
            />
          </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Filter = (props) => {
  const { search, handleSearchChange, searchPerson } = props;
  return (
    <>
      <form onSubmit={searchPerson}>
        <div>
          <div>
            Search:
            <input
              value={search}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <button type="submit">filter</button>
          </div>
        </div>
      </form>
    </>
  );
};

const NumberLine = (props) => {
  const { person, deletePerson } = props;
  return (
    <li>
      {person.name}, {person.number}
      <button onClick={() => deletePerson(person)}>delete</button>
    </li>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
};

export default App;
