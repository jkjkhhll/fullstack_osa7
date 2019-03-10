
import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

import { loginUser, logoutUser } from '../reducers/loginReducer'

const LoginForm = (props) => {
    const user = props.user

    const handleLogin = (event) => {
        event.preventDefault()
        props.loginUser({
            username: event.target.username.value,
            password: event.target.password.value
        })
    }
    
    if (user === null) {
        return (
            <div>
                <h2>Log in to application</h2>

                <Form onSubmit={handleLogin}>
                    <Form.Field>
                        käyttäjätunnus
                        <input id="username" name="username" />
                    </Form.Field>
                    <Form.Field>
                        salasana
                     <input type="password" id="password" name="password" />
                    </Form.Field>
                    <Button type="submit">kirjaudu</Button>
                </Form>
            </div>
        )
    }

    return null
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)