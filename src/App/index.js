import DiagramEditor from 'react-diagrams'
import React from 'react'
import { schema } from './schema'
import './App.scss'

class App extends React.Component {
  static editorApi = undefined
  state = { x: '' }

  handleGrafExport = (e) => {
    console.log(this.editorApi.exportGraph())
  }

  testZero = () => {
    if (!this.state.x || this.state.x >= 1000) {
      // eslint-disable-next-line
      alert('Neplatny vstup')
      return
    }
    const graph = this.editorApi.exportGraph()
    const begins = Object.keys(graph.widgets).filter((key) => graph.widgets[key].key === 'begin')
    let message = 'Zle! :('
    let state = { input: this.state.x }
    if (begins.length === 1) {
      state = { command: graph.widgets[begins[0]], input: this.state.x }
      let maxIter = schema.maxSteps
      while (maxIter !== 0 && state.command && state.command.key !== 'end') {
        maxIter -= 1
        state = this.executeCommand(state)
      }
      if (state.command && state.command.key === 'end' && state.input === 0) message = 'Super! :)'
    }
    // eslint-disable-next-line
    alert(message + `(cislo x je ${state.input})`)
  }

  executeCommand = (state) => {
    const { command, input } = state
    const graph = this.editorApi.exportGraph()
    const getNodeByPort = (portId) => {
      const id = Object.keys(graph.widgets).find((nodeId) => {
        return graph.widgets[nodeId].inPorts.find((port) => port.editorKey === portId)
      })

      return id && graph.widgets[id]
    }
    const findPortTarget = (source) => {
      const id = Object.keys(graph.links).find((linkId) => graph.links[linkId].source === source)
      return id && graph.links[id].destination
    }
    const findPort = (ports, key) => {
      const portIndex = Object.keys(ports).find((portId) => ports[portId].key === key)
      return ports[portIndex].editorKey
    }
    switch (command.key) {
      case 'begin':
        return { command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))), input }
      case 'end':
        return state
      case 'is_zero': {
        const portKey = input === 0 ? 'zero' : 'nonzero'
        return {
          command: getNodeByPort(findPortTarget(findPort(command.outPorts, portKey))),
          input,
        }
      }
      case 'dec':
        return {
          command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))),
          input: input - 1,
        }
      case 'inc':
        return {
          command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))),
          input: input + 1,
        }
      default:
        return undefined
    }
  }

  setX = (e) => this.setState({ x: parseInt(e.target.value, 10) })

  handleRef = (ref) => {
    this.editorApi = ref
  }

  render() {
    return (
      <div>
        <DiagramEditor schema={schema} ref={this.handleRef} />
        <div className="Toolbar">
          API:
          <button onClick={this.handleGrafExport}>Export graph</button>
        </div>
        <div className="Problems">
          <div>
            <p>
              Na vstupe je kladne cislo x mensie ako 1000, vystup vasho programu ma byt cislo 0.
            </p>
            <div className="sameLine">
              <input
                type="number"
                value={this.state.x}
                onChange={this.setX}
                placeholder="Zvolte x"
              />
              <button onClick={this.testZero}>Otestuj</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
