import React from 'react'
import DisplayExpandedCountry from './DisplayExpandedCountry'
import CountryRow from './CountryRow'


const Display10CountriesMax = ({ countries, handleClick }) => {
    // console.log('10 countries: ', countries)
    // console.log('10 countries.length: ', countries.length)
  
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    }
    else if (countries.length === 0) {
      console.log('no countries found')
      return <p>No countries found.</p>
    }
    else if (countries.length > 1 && countries.length <= 10) {
      return countries.map((country, index) => <CountryRow key={index} name={country.name} handleClick={handleClick}/>)

    }
    else if (countries.length === 1) {
      return <DisplayExpandedCountry country={countries} />
  
    }
  }

  export default Display10CountriesMax