import React from 'react'

const SearchBox = ({ label, handleSearch }) => {
    return (
        <>
            {label}
            <input type="search" onChange={handleSearch}></input>
        </>
    )
}

export default SearchBox