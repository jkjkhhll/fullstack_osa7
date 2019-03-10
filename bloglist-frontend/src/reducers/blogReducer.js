import blogService from '../services/blogs'
import commentService from '../services/comments'
import { showNotification } from './notificationReducer'


const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_BLOG':
            return state.concat(action.data)
        case 'REMOVE_BLOG':
            return state.filter(b => b.id !== action.data.id)
        case 'LIKE_BLOG':
            return state.map(b => b.id === action.data.id ? action.data : b)
        case 'COMMENT_BLOG':
            const updatedBlog = state.find(b => b.id === action.data.blog)
            updatedBlog.comments = updatedBlog.comments.concat(action.data)
            return state.map(b => b.id === updatedBlog.id ? updatedBlog : b)
        case 'INIT_BLOGS':
            return action.data
        default:
            return state
    }

}

export const addBlog = (blog, token) => {
    return async dispatch => {
        const createdBlog = await blogService.create(blog, token)
        dispatch({
            type: 'ADD_BLOG',
            data: createdBlog
        })
        showNotification(`a new blog ${createdBlog.title} by ${createdBlog.author} added`, 'success')(dispatch)
    }
}

export const removeBlog = (blog, token) => {
    return async dispatch => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            await blogService.remove(blog, token)
            dispatch({
                type: 'REMOVE_BLOG',
                data: blog
            })
            showNotification(`blog ${blog.title} by ${blog.author} removed!`, 'success')(dispatch)
        }
    }
}

export const likeBlog = (blog, token) => {
    return async dispatch => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog, token)
        updatedBlog.comments = likedBlog.comments
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
        showNotification(`blog ${blog.title} by ${blog.author} liked!`, 'success')(dispatch)
    }
}

export const commentBlog = (id, text) => {
    return async dispatch => {
        const newComment = await commentService.comment({blog: id, text})
        dispatch({
            type: 'COMMENT_BLOG',
            data: newComment
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export default blogReducer

/*
    const createBlog = async (blog) => {
        const createdBlog = await blogService.create(blog)
        newBlogRef.current.toggleVisibility()
        setBlogs(blogs.concat(createdBlog))
        notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`)
    }

    const likeBlog = async (blog) => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        const updatedBlog = await blogService.update(likedBlog)
        setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
        notify(`blog ${updatedBlog.title} by ${updatedBlog.author} liked!`)
    }

    const removeBlog = async (blog) => {
        const ok = window.confirm(`remove blog ${blog.title} by ${blog.author}`)
        if (ok) {
            await blogService.remove(blog)
            setBlogs(blogs.filter(b => b.id !== blog.id))
            notify(`blog ${blog.title} by ${blog.author} removed!`)
        }
    }
    */