import React, { Component } from 'react'
import { Route, Link } from "react-router-dom"
import { Textfit } from 'react-textfit'


function Talk(props) {
  return (
    <div className="talk">
      <input type="text" value={props.text} onChange={props.onTextChange}></input>
      <Link className="btn" to="/shout" onClick={props.onBigTextChange}>SHOUT!</Link>
    </div>
  )
}

function Shout(props) {
  return (
    <Textfit
      className="shout"
      mode="multi"
      max={2000}
      forceSingleModeWidth={false}>
      {props.text}
    </Textfit>
  )
}

class App extends Component {
  constructor(props) {
    super(props);
    this.handleBigText = this.handleBigText.bind(this)
    this.handleText = this.handleText.bind(this)
    this.state = {
      text: '',
      bigText: ''
    }
  }

  handleBigText(event) {
    this.setState({ bigText: this.state.text.toUpperCase() })
  }

  handleText(event) {
    this.setState({ text: event.target.value })
  }

  render() {
    const text = this.state.text
    const bigText = this.state.bigText

    return [
      <Route
      key="talk"
      exact path="/"
      render={() => <Talk text={text} onTextChange={this.handleText} onBigTextChange={this.handleBigText} />}
      />,
      <Route
      key="shout"
      path="/shout"
      render={() => <Shout text={bigText} />}
      />
    ]
  }
}

export default App