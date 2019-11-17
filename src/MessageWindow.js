import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChatBubble from './ChatBubble'
import { generateId } from './utils/helpers'

class MessageWindow extends Component {
  constructor() {
    super()
    this.messagesEnd = React.createRef()
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    setTimeout(() => {
      this.scrollToBottom()
    }, 400)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.messages !== nextProps.messages || this.props.isTyping !== nextProps.isTyping
  }

  scrollToBottom = () => {
    this.messagesEnd.current.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    const { selectOpt, messages, isTyping } = this.props

    const msgs = messages.map((item) => (
      <ChatBubble
        fromBot={item.fromBot}
        message={item.response}
        key={`chatBubble${generateId()}`}
        opts={item.opts}
        selectOpt={selectOpt}
      />
    ))

    return (
      <div className="MessageWindow">
        <div className="MessageWindow__overflow">{msgs}</div>
        <div className={`MessageWindow__typing MessageWindow__typing--${isTyping}`}></div>
        <div ref={this.messagesEnd} />
      </div>
    )
  }
}

MessageWindow.propTypes = {
  selectOpt: PropTypes.func.isRequired,
  isTyping: PropTypes.bool,
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      fromBot: PropTypes.boolean,
      response: PropTypes.string.isRequired,
      opts: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
}

MessageWindow.defaultProps = {
  messages: [],
}

export default MessageWindow
