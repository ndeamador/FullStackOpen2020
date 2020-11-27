import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'

import {
  Table,
  TableBody,
  TableContainer,
  Paper,
} from '@material-ui/core'


const BlogList = ({ user }) => {

  const initialBlogs = useSelector(store => store.blogs)

  const orderedBlogs = initialBlogs.sort((a, b) => {
    if (a.likes > b.likes) {
      return -1
    } else if (a.likes < b.likes) {
      return 1
    } else {
      return 0
    }
  })


  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {orderedBlogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}


export default BlogList