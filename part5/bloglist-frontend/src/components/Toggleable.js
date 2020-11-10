import React, { useState, useImperativeHandle } from 'react'

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
        return {
            toggleVisibility
        }
    })


    let initiallyHiddenChildren = null
    let initiallyShownChildren = null
    console.log("initial children", props.children);

    // This is an attempt to allow the reusable Toggleable module to render elements with different initial hide/show states.
    // When only one child is present, the shildren don't come in an array of objects, so the filter method throws an error
    // !! child filters out all falsy elements (0, null, undefined...), as child.props throws an error otherwise.
    if (props.children.length !== undefined) {
        initiallyHiddenChildren = props.children.filter(child => !!child && child.props.initial_state === 'hide')
        initiallyShownChildren = props.children.filter(child => !!child && child.props.initial_state === 'show')

    // The else if condition is meant to be selected when only one valid child is passed (and to prevent errors if no children are passed)
    } else if (props.children.props.initial_state) {
        const childInitialState = props.children.props.initial_state
        childInitialState === 'hide' ? initiallyHiddenChildren = props.children : initiallyShownChildren = props.children

    }

    console.log("after ------------------------", initiallyHiddenChildren, initiallyShownChildren);



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