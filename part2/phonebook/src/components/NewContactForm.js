import React from 'react'

const NewContactForm = ({ newName, handleNameChange, newNumber, handleNumberChange, addContact }) => {
    return <form onSubmit={addContact}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>
        number: <input
          value={newNumber}
          onChange={handleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  }

  export default NewContactForm