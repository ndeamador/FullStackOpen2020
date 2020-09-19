import React from 'react'

const Filter = ({ label, handleSearch, placeholder }) => {
    return (
      <>
      {label}
      <input
        type="search"
        onChange={handleSearch}
        placeholder={placeholder}>
      </input>
      </>
    )
  }

export default Filter