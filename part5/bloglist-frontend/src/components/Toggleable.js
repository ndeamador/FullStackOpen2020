import React, { useState } from 'react'

// To pass components as arguments, the variable name must be capialized.
const Toggleable = (props) => {

    console.log(props.children);

    const initiallyHiddenChildren = props.children.filter(child => child.props.initial_state === 'hide')
    const initiallyShownChildren = props.children.filter(child => child.props.initial_state === 'show')


    const [visible, setVisible] = useState(false)

    // Note that these are applied as inline styles in the divs below.
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <>
            <div style={hideWhenVisible}>
                {initiallyShownChildren}
                <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
            </div>
            <div style={showWhenVisible}>
                {initiallyHiddenChildren}
                {/* note the syntax for calling two functions with the same onClick in ReactJS. The arguments are function alls */}
                <button onClick={ ()=> {toggleVisibility(); props.resetFormState()}}>{props.buttonLabel2}</button>
            </div>
        </>
    )

}

export default Toggleable