import React from 'react'
import { connect } from 'react-redux'
import { Menu, Button } from 'semantic-ui-react'

import { loginUser, logoutUser } from '../reducers/loginReducer'

const Login = (props) => {
    const user = props.user

    const handleLogout = (event) => {
        event.preventDefault()
        props.logoutUser()
    }

    if (user === null) {
        return null
    }

    return (
        <Menu.Item>
            {user.name} logged in &nbsp;
            <Button onClick={handleLogout}>logout</Button>
        </Menu.Item>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = {
    loginUser,
    logoutUser
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)