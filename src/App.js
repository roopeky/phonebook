import { useState } from "react";

const Filter = ({ filtered, filterByLetter }) => {
  return (
    <p>
      filter shown with <input value={filtered} onChange={filterByLetter} />
    </p>
  );
};

const PersonForm = ({
  addName,
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input name="name" value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input name="number" value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map((persons) => (
        <div key={persons.name}>
          {persons.name} {persons.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filtered, setFiltered] = useState("");
  const [personsToShow, setPersonsToShow] = useState(persons);

  const addName = (e) => {
    e.preventDefault();
    const name = persons.map((persons) => persons.name);
    const nameObj = {
      name: newName,
      number: newNumber,
    };

    if (!name.includes(nameObj.name)) {
      setPersons(persons.concat(nameObj));
      setPersonsToShow(persons.concat(nameObj));
    } else {
      alert(`${newName} is already added to phonebook`);
    }

    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const filterByLetter = (e) => {
    e.preventDefault();
    const search = e.target.value;
    setFiltered(search);
    setPersonsToShow(
      persons.filter((p) => p.name.toLowerCase().includes(search))
    );
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filtered={filtered} filterByLetter={filterByLetter} />
      <h3>Add new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
