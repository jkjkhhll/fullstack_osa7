import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Container, Menu } from 'semantic-ui-react'

import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Login from './components/Login'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'

import { initBlogs } from './reducers/blogReducer'
import { initUser } from './reducers/loginReducer'
import { initUsers } from './reducers/userReducer'


const App = (props) => {
    useEffect(() => {
        props.initBlogs()
    })

    useEffect(() => {
        props.initUser()
    })

    useEffect(() => {
        props.initUsers()
    })

    return (
        <Container>
            <Router>
                <div>
                    <Menu inverted>
                        <Menu.Item>
                            <Link to="/">home</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to="/users">users</Link>
                        </Menu.Item>
                        <Login />
                    </Menu>
                    <Notification />
                    <LoginForm />
                    <Route exact path="/" render={() => <BlogList />} />
                    <Route exact path="/blogs/:id" render={({ match }) =>
                        <Blog id={match.params.id} />
                    } />
                    <Route exact path="/users" render={() => <UserList />} />
                    <Route exact path="/users/:id" render={({ match }) =>
                        <User id={match.params.id} />
                    } />
                </div>
            </Router>
        </Container>
    )
}

const mapDispatchToProps = {
    initBlogs,
    initUser,
    initUsers
}

export default connect(null, mapDispatchToProps)(App)