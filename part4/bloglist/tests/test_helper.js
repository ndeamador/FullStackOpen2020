const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'Creating Adam',
        author: 'test',
        url: 'test.t',
        likes: 1
    },
    {
        title: 'Creating Eve',
        author: 'test',
        url: 'test.t',
        likes: 2
    }
]

const genericNewBlog = {
    title: 'newcomer',
    author: 'test',
    url: 'test.t',
    likes: 3
}

const noLikesBlog = {
    title: 'noLikesBlog',
    author: 'test',
    url: 'test.t'
}

const noTitleBlog = {
    author: 'he who writes no title',
    url: 'test.t'
}

const noUrlBlog = {
    author: 'he who writes no url',
    title: 'test'
}

const onlyAuthorBlog = {
    author: 'he who writes nothing',
}

module.exports = {
    initialBlogs,
    genericNewBlog,
    noLikesBlog,
    noTitleBlog,
    noUrlBlog,
    onlyAuthorBlog
}