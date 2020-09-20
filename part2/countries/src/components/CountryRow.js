import React from 'react'

const CountryRow = ({ name, handleClick }) => <div>
    {/* remember the event handler can't be a function call */}
    <span>{name}</span> <input type="button" value="show" onClick={() => handleClick(name)}></input>
</div>

export default CountryRow