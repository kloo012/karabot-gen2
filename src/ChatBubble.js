import React, { Component } from 'react'
import posed, { PoseGroup } from 'react-pose'
import { generateId } from './utils/helpers'

const Bubble = posed.div({
  enter: {
    y: 0,
    opacity: 1,
    delay: 300,
    transition: {
      y: { type: 'spring', stiffness: 800, damping: 15 },
      default: { duration: 100 },
    },
  },
})

class ChatBubble extends Component {
  constructor() {
    super()
    this.state = {
      isVisible: false,
    }
  }

  componentDidMount() {
    this.setState({
      isVisible: true,
    })
  }

  render() {
    const { opts, fromBot, message, selectOpt } = this.props
    let btnOpts

    if (opts && opts.length > 0) {
      btnOpts = opts.map((item) => {
        return (
          <button
            className="ChatButton"
            key={`chatButton${generateId()}`}
            onClick={() => selectOpt(item)}
          >
            {item}
          </button>
        )
      })
    }

    return (
      <PoseGroup>
        {this.state.isVisible && [
          <Bubble
            className={`ChatBubble ChatBubble--${fromBot === true ? 'left' : 'right'} w-full md:w-1/2`}
            key={generateId('bubble')}
          >
            {message}
            {btnOpts && [<div>{btnOpts}</div>]}
          </Bubble>,
        ]}
      </PoseGroup>
    )
  }
}

export default ChatBubble
