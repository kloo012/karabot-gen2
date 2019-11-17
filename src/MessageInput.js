import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class MessageInput extends PureComponent {
  render() {
    const { handleMessageInput, handleSubmit, currentMsg } = this.props

    return (
      <div className="MessageInput">
        <form onSubmit={handleSubmit}>
          <input
            autoFocus={true}
            className="MessageInput__input"
            type="text"
            placeholder="Type something..."
            name="msg"
            id="msg"
            value={currentMsg}
            onChange={handleMessageInput}
          />
        </form>
      </div>
    )
  }
}

MessageInput.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  currentMsg: PropTypes.string,
  handleMessageInput: PropTypes.func.isRequired,
}

MessageInput.defaultProps = {
  currentMsg: {}
}

export default MessageInput
