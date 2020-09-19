import React, { useState } from 'react'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import ContactList from './components/ContactList'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  const addContact = (event) => {
    event.preventDefault()

    if (persons.findIndex(person => person.name === newName) > -1) {
      window.alert(`${newName} is already added to the phonebook`)
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter label="filter shown with" handleSearch={handleSearch} placeholder="Search contact's name" />
     
      <h3>Add a new</h3>

      <NewContactForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />

      <h3>Numbers</h3>

      <ContactList persons={persons} newSearch={newSearch} />
      
    </div>

  )
}

export default App