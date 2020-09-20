import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Display10CountriesMax from './components/Display10CountriesMax'
import SearchBox from './components/SearchBox'


const App = () => {

  const [countries, setCountries] = useState([])
  const [searchInput, setNewSearch] = useState('')
  

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(res => {
      console.log('Connected to RestCountries API');
      setCountries(res.data)
      console.log('Country database loaded');
    })
  }, [])

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const handleShowClick = (country) => {
    setNewSearch(country)
  }

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(searchInput.toLowerCase()))



  return (
    <div className="App">
      <SearchBox label="find countries" handleSearch={handleSearch}/>

      <Display10CountriesMax countries={filteredCountries} handleClick={handleShowClick}/>
    </div>
  )
}

export default App
