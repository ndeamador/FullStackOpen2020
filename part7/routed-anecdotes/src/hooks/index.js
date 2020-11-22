import { useState } from 'react'

export const useField = (name) => {
  // const [content, setContent] = useState('')
  // const [author, setAuthor] = useState('')
  // const [info, setInfo] = useState('')
  const [value, setValue] = useState('')
  console.log(name, value);

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    reset,
    name,
    value,
    onChange
  }
}