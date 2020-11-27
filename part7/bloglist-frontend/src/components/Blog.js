import React from 'react'
import { Link } from 'react-router-dom'

import {
  TableCell,
  TableRow
} from '@material-ui/core'



const Blog = ({ blog }) => {

  return (
    <TableRow key={blog.id}>
      <TableCell>
        <Link to={`/blogs/${blog.id}`} className="blog-container"> {blog.title}</Link>
      </TableCell>
      <TableCell>
        {blog.author}
      </TableCell>
    </TableRow>
  )
}


export default Blog

