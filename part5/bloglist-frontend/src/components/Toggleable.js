import React, { useState, useImperativeHandle } from 'react'
console.log('in toggleable');

// Wrapping the functioninside a forwardRef funciton call gives the component access the ref assigned to it.
const Toggleable = React.forwardRef((props, ref) => {

    const [visible, setVisible] = useState(false)

    // Note that these are applied as inline styles in the divs below.
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    // this hook makes the toggleVisibility fucntion available outside the component
    useImperativeHandle(ref, () => {
        console.log('inside toggleable ref')

        return {
            toggleVisibility
        }
    })


    let initiallyHiddenChildren = null
    let initiallyShownChildren = null

    // This is an attempt to allow the reusable Toggleable module to render elements with different initial hide/show states.
    // When only one child is present, the shildren don't come in an array of objects, so the filter method throws an error
    // * I have tried using the spread operator for the assignment but I kept getting a
    if (props.children.length > 1) {
        initiallyHiddenChildren = props.children.filter(child => child.props.initial_state === 'hide')
        initiallyShownChildren = props.children.filter(child => child.props.initial_state === 'show')

    } else {
        const childInitialState = props.children.props.initial_state
        childInitialState === 'hide' ? initiallyHiddenChildren = props.children : initiallyShownChildren = props.children

    }


    return (
        <div className="toggleable-container">
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel1}</button>
                {initiallyShownChildren}
            </div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel2}</button>
                {initiallyHiddenChildren}
            </div>
        </div>
    )

})

export default Toggleable