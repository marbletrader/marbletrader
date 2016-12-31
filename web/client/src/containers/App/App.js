import React, { Component } from 'react'
import blueMarble from '../../assets/the-blue-marble.png'
import './App.css'
// Elm
import Elm from 'react-elm-components'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={blueMarble} className='App-logo' alt='logo' />
          <h2>Marble Trader</h2>
        </div>
        <p className='App-intro'>
          This is where it all happens.
        </p>
      </div>
    )
  }
}

export default App
