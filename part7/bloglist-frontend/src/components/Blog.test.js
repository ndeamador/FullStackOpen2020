import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe(`Blog rendering`, () => {
  test(`renders the blog's title and author but not the other details by default`, () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 10,
      author: "automated-test",
      url: "@automated test",
      user: { id: 123 }
    }

    const user = {
      id: 123
    }


    const component = render(
      <Blog blog={blog} user={user} />
    )

    const blogHeader = component.container.querySelector('.blog-title-and-author')
    const blogContent = component.container.querySelector('.toggleable-initially-hidden')

    // The render method returns an object with several properties, including a "container" property  with the HTML rendered by the component.
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )

    expect(blogHeader).toHaveTextContent('Component testing is done with react-testing-library')
    expect(blogHeader).toHaveTextContent('automated-test')
    expect(blogHeader).not.toHaveStyle('display: none')
    expect(blogContent).toHaveStyle('display: none')

    // Prints the HMTL strcuture
    // component.debug()

    // The prettyDOM method allows us to print a smaller part of the HTML code
    // const test = component.container.querySelector('.toggleable-initially-hidden button');
    // console.log(prettyDOM(test))  
  })



  test(`url and likes are shown when the view button is clicked`, () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 10,
      author: "automated-test",
      url: "@automated.test",
      user: { id: 123 }
    }

    const user = {
      id: 123
    }

    const component = render(
      <Blog blog={blog} user={user} />
    )

    const viewButton = component.getByText('view')
    const toggleableContent = component.container.querySelector('.toggleable-initially-hidden')


    // check the toggleable content before and after clicking.
    expect(toggleableContent).toHaveStyle('display: none')
    fireEvent.click(viewButton)
    expect(toggleableContent).not.toHaveStyle('display: none')
    expect(toggleableContent).toHaveTextContent('@automated.test')
    expect(toggleableContent).toHaveTextContent('10')
  })



  test(`Event handler called twice if like button is clicked twice `, () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      likes: 10,
      author: "automated-test",
      url: "@automated.test",
      user: { id: 123 }
    }

    const user = {
      id: 123
    }


    // https://jestjs.io/docs/en/mock-functions.html
    const mockHandler = jest.fn()

    const component = render(
      <Blog blog={blog} user={user} updateBlog={mockHandler} />
    )


    const likeButton = component.getByText('like')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })  

})



