import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewContactForm from './components/NewContactForm'
import ContactList from './components/ContactList'
import personService from './services/persons'
import Notification from './components/Notification'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setNewMessage] = useState({ type: null, text: null })



  useEffect(() => {

    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])



  const notificationTimeout = () => {
    setTimeout(() => {
      setNewMessage(
        {
          type: null,
          text: null
        }
      )
    }, 5000)
  }

  const handleGenericError = (err) => {

    console.log(err.response.data)

    setNewMessage({
      type: 'error',
      text: `${err.name}: ${err.response.data.error}`
    })
  }



  const addContact = (event) => {
    event.preventDefault()

    // Throw exception if name field is empty
    if (newName.trim() === '') {
      setNewMessage(
        {
          type: 'exception',
          text: `Name can't be empty`
        })

      notificationTimeout()
    }
    else if (newName.trim() !== '') {

      // make both lower case so that the same name can't be added twice just by using capitals.
      const foundNameIndex = persons.findIndex(person => person.name.toLowerCase() === newName.toLowerCase())

      // if the contact already exists, update the number
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
              // if the contact to update has been deleted in the database, delete it from the front end
              if (returnedContact === null) {
                setPersons(persons.filter(person => person.id !== backEndId))

                setNewMessage(
                  {
                    type: 'exception',
                    text: `Contact ${newName} not found in server. Phonebook updated.`
                  })

                  notificationTimeout()

              } else {
                // used returnedContact instead of personObject for the update as adding the object with no id was creating an error when deleting.
                setPersons(persons.map(person => person.id === returnedContact.id ? returnedContact : person))
                setNewName('')
                setNewNumber('')

                setNewMessage(
                  {
                    type: 'success',
                    text: `${returnedContact.name}'s number changed to ${returnedContact.number}`
                  })

                notificationTimeout()
              }
            })
            .catch(err => {

              // setPersons(persons.filter(person => person.id !== backEndId))

              // setNewMessage(
              //   {
              //     type: 'error',
              //     text: `${err.name}: Contact ${newName} was already deleted from server. Phonebook updated.`
              //   })

              handleGenericError(err)
              notificationTimeout()

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

            setNewMessage(
              {
                type: 'success',
                text: `Added contact ${newName}`
              })

            notificationTimeout()

          })
          .catch(err => {

            handleGenericError(err)
            notificationTimeout()
          })
      }
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

          setNewMessage({
            type: 'success',
            text: `Contact ${contactToDelete.name} deleted.`
          })

          notificationTimeout()

        })
        .catch(err => {
          // setPersons(persons.filter(person => person.id !== contactToDelete.id))
          // setNewMessage({
          //   type: 'error',
          //   text: `${err.name}: Contact ${contactToDelete.name} not found in the server. Phonebook updated.`
          // })

          handleGenericError(err)
          notificationTimeout()
        })

    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={message} />

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