import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

import Togglable from './Togglable'
import NewBlog from './NewBlog'

const BlogList = (props) => {

    const newBlogRef = React.createRef()

    const byLikes = (b1, b2) => b2.likes - b1.likes

    if (props.user == null) {
        return <div></div>
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Table striped celled>
                <Table.Body>
                    {props.blogs.sort(byLikes).map(blog =>
                        <Table.Row key={blog.id}>
                            <Table.Cell>
                                <Link class="blog" to={`/blogs/${blog.id}`}>{blog.title}</Link>
                            </Table.Cell>
                            <Table.Cell>
                                {blog.likes} likes
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Togglable buttonLabel='add new' ref={newBlogRef}>
                <NewBlog parent={newBlogRef} />
            </Togglable>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        user: state.user
    }
}

export default connect(mapStateToProps)(BlogList)