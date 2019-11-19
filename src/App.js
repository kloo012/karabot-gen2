import React, { Component } from 'react'
import { setTimer, clearTimer } from './utils/helpers'
import MessageWindow from './MessageWindow'
import MessageInput from './MessageInput'

let chatTimer

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentMsg: '',
      messages: [],
      data: null,
      isTyping: false,
      measureNextPause: true,
    }
  }

  componentDidMount() {
    this.getInitMsg()
      .then(res => {
        this.addToConversation(res, true)
      })
      .catch(e => console.log(e))
    this.initTimer()
  }

  initTimer = () => {
    chatTimer = setTimer(() => {
      this.getCheckInMsg()
        .then(res => {
          this.addToConversation(res, true)
        })
        .catch(e => console.log(e))
    }, 15 * 1000)
  }

  getCheckInMsg = async () => {
    try {
      const response = await fetch('/api/getCheckIn')
      const body = await response.json()
      if (response.status !== 200) {
        throw Error(body.message)
      }
      this.setState({ measureNextPause: false })
      return body
    } catch (e) { console.log(e) }
  }

  // TODO: dynamic server functions
  getInitMsg = async () => {
    try {
      const response = await fetch('/api/getInit')
      const body = await response.json()
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body
    } catch (e) { console.log(e) }
  }

  scheduleCall = e => {
    console.log('schedule')
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const msg = new FormData(e.target).get('msg')
    this.clearInput()
    this.sendResponse(msg)
  }

  setTypingGif = val => {
    this.setState({ isTyping: val })
  }

  sendResponse = async msg => {
    this.addToConversation({
      response: msg,
    })
    this.setTypingGif(true)
    const res = await fetch('/api/postMsg', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ post: msg }),
    })
    try {
      const body = await res.text()
      this.addToConversation(JSON.parse(body), true)
      this.setTypingGif(false)
    } catch (e) { console.log(e) }
  }

  handleMessageInput = e => {
    clearTimer(chatTimer)
    if (this.state.measureNextPause) {
      this.initTimer()
    }
    this.setState({ currentMsg: e.target.value })
  }

  clearInput = () => {
    this.setState({
      currentMsg: '',
    })
  }

  addToConversation = (msgData, fromBot) => {
    const newMessages = [...this.state.messages, { fromBot, ...msgData }]
    this.setState({
      currentMsg: '',
      messages: newMessages,
    })
    clearTimer(chatTimer)
    if (this.state.measureNextPause) {
      this.initTimer()
    }
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <span role="img" aria-label="robot emoji">
            🤖
          </span>{' '}
          K a r a b o t{/* <button onClick={this.scheduleCall}>Schedule a call</button> */}
        </header>
        <div className="w-full max-w-md bg-gray-800">
          <div className="App__chat-window">
            <div className="App__chat-window_inner flex flex-col h-full">
              <MessageWindow
                messages={this.state.messages}
                selectOpt={this.sendResponse}
                isTyping={this.state.isTyping}
              />
              <MessageInput
                handleSubmit={this.handleFormSubmit}
                handleMessageInput={this.handleMessageInput}
                currentMsg={this.state.currentMsg}
              />
            </div>
          </div>
          <p className="App-intro">{this.state.data}</p>
        </div>
      </div>
    )
  }
}

export default App
