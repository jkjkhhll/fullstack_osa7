import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

const UserList = (props) => {

    if (props.user === null) return <div></div>

    return (
        <div>
            <h2>Users</h2>
            <Table>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>
                        Name
                    </Table.HeaderCell>
                    <Table.HeaderCell>
                        Added blogs
                    </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.users.map(u =>
                        <Table.Row key={u.id}>
                            <Table.Cell><Link to={`/users/${u.id}`}>{u.name}</Link></Table.Cell>
                            <Table.Cell>{u.blogs.length}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        users: state.users
    }
}

export default connect(mapStateToProps)(UserList)