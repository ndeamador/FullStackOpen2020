import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    const handleChange = (text) => {
        dispatch(setFilter(text))
    }

    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            Filter: <input onChange={event => handleChange(event.target.value)} />
        </div>
    )
}

export default Filter