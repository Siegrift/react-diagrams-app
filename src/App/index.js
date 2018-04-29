import React from 'react'
import DiagramEditor from 'react-diagrams/src'
import { schema } from './schema'
import { Button } from 'reactstrap'

class App extends React.Component {
  static editorApi = undefined

  handleGrafExport = (e) => {
    console.log(this.editorApi.exportGraph())
  }

  testZero = () => {
    const graph = this.editorApi.exportGraph()
    const begins = Object.keys(graph.widgets).filter((key) => graph.widgets[key].key === 'begin')
    let message = 'Zle! :('
    if (begins.length === 1) {
      let state = { command: graph.widgets[begins[0]], input: 980 }
      let maxIter = schema.maxSteps
      while (maxIter !== 0 && state.command && state.command.key !== 'end') {
        maxIter -= 1
        state = this.executeCommand(state)
      }
      if (state.command && state.command.key === 'end' && state.input === 0) message = 'Super! :)'
    }
    // eslint-disable-next-line
    alert(message)
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
      case 'begin': return { command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))), input }
      case 'end': return state
      case 'is_zero': {
        const portKey = input === 0 ? 'zero' : 'nonzero'
        return { command: getNodeByPort(findPortTarget(findPort(command.outPorts, portKey))), input }
      }
      case 'dec': return { command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))), input: input - 1 }
      case 'inc': return { command: getNodeByPort(findPortTarget(findPort(command.outPorts, 'out'))), input: input + 1 }
      default: return undefined
    }
  }

  render() {
    return (
      <div>
        <DiagramEditor schema={schema} ref={(ref) => {this.editorApi = ref}} />
        <div className="Toolbar" >
          API:
          <Button onClick={this.handleGrafExport} >Export graph</Button>
        </div>
        <div className="Problems">
          <div >
            <p>Na vstupe je kladne cislo x mensie ako 1000, vystup vasho programu ma byt cislo 0.</p>
            <Button onClick={this.testZero} >Otestuj</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default App
