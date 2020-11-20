import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {

    // const dispatch = useDispatch()

    const handleChange = (text) => {
        // dispatch(setFilter(text))
        props.setFilter(text)

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


export default connect(
    null,
    { setFilter }
)(Filter)

// export default Filter