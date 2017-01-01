import React, { Component } from 'react'
import blueMarble from '../../assets/the-blue-marble.png'
import './App.css'
// Elm
import Elm from 'react-elm-components'
import { Bread } from '../../elm/dist/Bread.js'
import { ReverseText } from '../../elm/dist/ReverseText.js'
import { BasicForm } from '../../elm/dist/BasicForm.js'
import { DieRoll } from '../../elm/dist/DieRoll.js'
import { Chat } from '../../elm/dist/Chat.js'

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
        <Elm src={Bread} />
        <Elm src={ReverseText} />
        <Elm src={BasicForm} />
        <Elm src={DieRoll} />
        <Elm src={Chat} />
      </div>
    )
  }
}

export default App
