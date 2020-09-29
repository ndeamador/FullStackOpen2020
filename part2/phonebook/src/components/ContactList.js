import React from 'react'

const ContactRow = ({ person, handleClick }) => {
    return <li>{person.name} {person.number}<button onClick={() => handleClick(person)}>Delete</button></li>
}

const ContactList = ({ persons, newSearch, handleClick }) => {


    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    const listNames = filteredPersons.map(person => <ContactRow key={person.name} person={person} handleClick={handleClick} />)


    return <ul>{listNames}</ul>
}

export default ContactList