
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


describe('Blogform tests', () => {
    test(`<BlogForm /> calls the event handler for a new blog with correct details`, () => {
        const createBlog = jest.fn()

        const component = render(
            <BlogForm initial_state='hide' createBlog={createBlog} />
        )

        const titleInput = component.container.querySelector('#blogform-title-input')
        const form = component.container.querySelector('.blogform-container form')

        fireEvent.change(titleInput, {
            target: { value: 'New blog title' }
        })
        fireEvent.submit(form)

        expect(createBlog.mock.calls).toHaveLength(1)
        expect(createBlog.mock.calls[0][0].title).toBe('New blog title')
    })
})
