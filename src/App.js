import React, { Component } from 'react'
import MessageWindow from './MessageWindow'
import MessageInput from './MessageInput'

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentMsg: '',
      messages: [],
      data: null,
      isTyping: false,
    }
  }

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.getInitMsg()
      .then(res => {
        this.addToConversation(res, true)
      })
      .catch(err => console.log(err))
  }

  getInitMsg = async () => {
    try {
      const response = await fetch('/api/getInit')
      const body = await response.json()
      if (response.status !== 200) {
        throw Error(body.message)
      }
      return body
    } catch (e) {
      console.log('error - are your servers both running? ' + e)
    }
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const msg = new FormData(e.target).get('msg')
    this.clearInput()
    this.sendResponse(msg)
  }

  setTyping = val => {
    this.setState({ isTyping: val })
  }

  sendResponse = async msg => {
    this.addToConversation({
      response: msg,
    })
    this.setTyping(true)
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
      this.setTyping(false)
    } catch (err) {
      console.log(err)
    }
  }

  handleMessageInput = e => {
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
  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <span role="img" aria-label="robot emoji">
            🤖
          </span>{' '}
          K a r a b o t
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
