import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import ContactList from './components/ContactList'
import axios from 'axios'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])





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