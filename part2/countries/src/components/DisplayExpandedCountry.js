import React from 'react'
import Weather from './Weather'

const DisplayExpandedCountry = ({ country }) => {

    const oneCountry = country[0]

    const listLanguages = oneCountry.languages.map((language, index) => <li key={index}>{language.name}</li>)

    return (
        <>
            <h2>{oneCountry.name}</h2>
            <div>capital {oneCountry.capital}</div>
            <div>population {oneCountry.population}</div>
            <h3>languages</h3>
            <ul>
                {listLanguages}
            </ul>
            <img src={oneCountry.flag} height="100" alt={`flag of ${oneCountry.name}`} />

            <Weather country={country} />
        </>
    )

}

export default DisplayExpandedCountry