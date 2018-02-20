import React from 'react'
import DiagramEditor from 'react-diagrams/src'
import { schema } from './schema'

const App = () => (
  <div>
    <DiagramEditor schema={schema} />
  </div>
)

export default App
