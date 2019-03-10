import React from 'react'
import { connect } from 'react-redux'
import { likeBlog, commentBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'


const Blog = (props) => {

    const handleLike = () => {
        props.likeBlog(props.blog, props.user.token)
    } 

    const handleComment = (event) => {
        event.preventDefault()
        props.commentBlog(props.blog.id, event.target.comment.value)
    }

    if (props.blog === undefined) return null
    if (props.user === null) return null

    return (
        <div>
        <h1>{props.blog.title}</h1>
        <p><a href={props.blog.url}>{props.blog.url}</a></p>
        <p>{props.blog.likes} likes &nbsp;
            <Button onClick={handleLike}>like</Button>
        </p>
        <p>added by {props.blog.user.name}</p>
        <h2>Comments</h2>
        <ul>
            {props.blog.comments.map(c => 
                <li key={c.id}>{c.text}</li>)}
        </ul>

        <Form onSubmit={handleComment}>
        <Form.Field>

            <input id="comment" name="comment"></input>
        </Form.Field>
            <Button type="submit">add comment</Button>
        </Form>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        blogs: state.blogs,
        blog: state.blogs.find(b => b.id === ownProps.id),
        user: state.user
    }
}

const mapDispatchToProps = {
    likeBlog,
    commentBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog)