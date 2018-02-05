import React from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'
import { buttonTextSelector } from './state'
import { toggleButtonText } from './actions'
import DiagramEditor from 'react-diagrams/src'

const App = ({ buttonText, toggleButtonText }) => (
  <div>
    <Button onClick={toggleButtonText}>{buttonText}</Button>
    <DiagramEditor />
  </div>
)

export default connect(
  (state) => ({
    buttonText: buttonTextSelector(state),
  }),
  {
    toggleButtonText,
  },
)(App)
