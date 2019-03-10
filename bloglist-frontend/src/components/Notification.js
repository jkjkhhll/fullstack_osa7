import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {
    if (props.notification.message === null) {
        return null
    }

    if (props.notification.type === 'error') {
        return (
            <Message error>
                {props.notification.message}
            </Message>
        )
    }

    return (
        <Message success>
            {props.notification.message}
        </Message>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

export default connect(mapStateToProps)(Notification)