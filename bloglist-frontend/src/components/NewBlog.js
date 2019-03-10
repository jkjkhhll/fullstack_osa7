import React from 'react'
import { connect } from 'react-redux'
import { useField } from '../hooks'
import { addBlog } from '../reducers/blogReducer'
import { Form, Button } from 'semantic-ui-react'

const NewBlog = (props) => {
    const [title, titleReset] = useField('text')
    const [author, authorReset] = useField('text')
    const [url, urlReset] = useField('text')

    const handleSubmit = async (event) => {
        event.preventDefault()
        props.parent.current.toggleVisibility()
        await props.addBlog({
            title: title.value,
            author: author.value,
            url: url.value
        }, props.user.token)
        titleReset()
        authorReset()
        urlReset()
    }

    return (
        <div>
            <h2>Create new</h2>

            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    title:
                    <input id="title" {...title} />
                </Form.Field>
                <Form.Field>
                    author:
                    <input id="author" {...author} />
                </Form.Field>
                <Form.Field>
                    url:
                    <input id="url" {...url} />
                </Form.Field>
                <Button type='submit'>create</Button>
            </Form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = {
    addBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBlog)