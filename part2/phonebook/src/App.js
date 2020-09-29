import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import ContactList from './components/ContactList'
// import axios from 'axios'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')


  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])




  const addContact = (event) => {
    event.preventDefault()

    const foundNameIndex = persons.findIndex(person => person.name === newName)

    // if the contact already exists
    if (foundNameIndex > -1) {

      if (window.confirm(`${newName} is already on the phonebook.\nReplace the old number witha new one?`)) {

        const personObject = {
          name: newName,
          number: newNumber
        }

        // The id property of the object and the object position in the array (foundNameIndex) are not necessarily the same:
        const backEndId = persons[foundNameIndex].id

        personService
          .update(backEndId, personObject)
          .then(returnedContact => {
            // used returnedContact instead of personObject for the update as adding the object with no id was creating an error when deleting.
            setPersons(persons.map(person => person.id === returnedContact.id ? returnedContact : person))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('somethig went wrong when updating the contact', error);
          })
      }

    }
    // if the contact does not exist
    else {
      const personObject = {
        name: newName,
        number: newNumber
      }

      personService
        .create(personObject)
        .then(returnedContact => {
          // used returnedContact instead of personObject for the update as adding the object with no id was creating an error when deleting.
          setPersons(persons.concat(returnedContact))
          setNewName('')
          setNewNumber('')
        })
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

  const handleDeleteClick = (contactToDelete) => {

    if (window.confirm(`Delete contact ${contactToDelete.name}?`)) {

      personService.deleteContact(contactToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== contactToDelete.id))
        })
        .catch(error => {
          window.alert(`${contactToDelete.name} was already deleted from the server.`)
          setPersons(persons.filter(person => person.id !== contactToDelete.id))
        })
    }
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

      <ContactList persons={persons} newSearch={newSearch} handleClick={handleDeleteClick} />

    </div>

  )
}

export default App