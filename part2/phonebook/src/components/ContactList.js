import React from 'react'

const ContactRow = ({ person }) => {
    return <li>{person.name} {person.number}</li>
}

const ContactList = ({ persons, newSearch }) => {

    const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
    const listNames = filteredPersons.map(person => <ContactRow key={person.name} person={person} />)


    return <ul>{listNames}</ul>
}

export default ContactList